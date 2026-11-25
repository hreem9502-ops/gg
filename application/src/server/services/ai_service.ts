/**
 * PlantCare AI - AI service orchestrator.
 *
 * Provider chain (first success wins, every step fully server-side):
 *   1. Gemini Vision API      - used when GEMINI_API_KEY is configured
 *   2. Z.ai Vision (VLM)      - built-in vision model available in this
 *                               deployment environment
 *   3. Demo Mode              - clearly-labeled sample data, so the app
 *                               always remains usable without credentials
 *
 * Never exposes any API key to the client.
 */
import ZAI from "z-ai-web-dev-sdk";
import type { AnalyzeInput, PlantAnalysisResult } from "../types";
import { PLANT_IDENTIFICATION_PROMPT, normalizeIdentification, asString } from "./plant_identification";
import { DISEASE_ANALYSIS_PROMPT, normalizeHealth, normalizeCare } from "./disease_analysis";
import { getDemoAnalysis } from "./demo_data";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const GEMINI_TIMEOUT_MS = 30_000;
const VISION_TIMEOUT_MS = 90_000;

/** Full prompt sent to whichever vision model handles the request. */
function buildAnalysisPrompt(): string {
  return `You are PlantCare AI, an expert botanist and plant pathologist analyzing a user-uploaded photograph.

Respond ONLY with one valid JSON object (no markdown fences, no commentary) using EXACTLY this schema:
{
  "isPlant": boolean,
  "plant": {
    "commonName": string,
    "scientificName": string,
    "category": string,
    "description": string,
    "characteristics": string[],
    "growingEnvironment": string,
    "confidence": number or null
  },
  "health": {
    "hasVisibleSymptoms": boolean,
    "observedSymptoms": string[],
    "possibleProblem": string,
    "possibleCauses": string[],
    "recommendedActions": string[],
    "preventionAdvice": string[],
    "severity": "none" | "low" | "moderate" | "high" | "unknown",
    "confidence": number or null,
    "uncertaintyNote": string
  },
  "care": {
    "watering": string,
    "sunlight": string,
    "soil": string,
    "temperature": string,
    "humidity": string,
    "fertilization": string,
    "pruning": string,
    "maintenance": string[]
  },
  "disclaimer": string
}
${PLANT_IDENTIFICATION_PROMPT}
${DISEASE_ANALYSIS_PROMPT}
RULES:
- Keep all text in clear, simple English suitable for plant owners and beginners.
- The care guide must be for the identified species. If isPlant is false, care fields stay empty.
- The disclaimer should remind the user that a photograph cannot replace professional/agricultural inspection.
Output the JSON object now.`;
}

/** Extracts the first balanced JSON object from a model response. */
export function extractJsonObject(text: string): Record<string, unknown> {
  if (!text) throw new Error("Empty model response");
  let cleaned = text.trim();
  // strip markdown fences if present
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
  const start = cleaned.indexOf("{");
  if (start === -1) throw new Error("No JSON object found in model response");
  // balance braces
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < cleaned.length; i++) {
    const ch = cleaned[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === "\\") {
      escaped = true;
      continue;
    }
    if (ch === '"') inString = !inString;
    if (inString) continue;
    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        const slice = cleaned.slice(start, i + 1);
        return JSON.parse(slice) as Record<string, unknown>;
      }
    }
  }
  throw new Error("Malformed JSON object in model response");
}

/** Turns raw parsed JSON into the canonical, fully-validated result. */
function normalizeResult(
  raw: Record<string, unknown>,
  source: PlantAnalysisResult["source"],
  isDemo: boolean,
  notice: string
): PlantAnalysisResult {
  const isPlant = /^(true|yes)$/i.test(asString(raw.isPlant));
  return {
    isPlant,
    plant: normalizeIdentification(raw.plant),
    health: normalizeHealth(raw.health),
    care: normalizeCare(raw.care),
    disclaimer: asString(raw.disclaimer),
    source,
    demo: isDemo,
    analysisNotice: notice,
  };
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms / 1000}s`)), ms)
    ),
  ]);
}

// --------------------------------------------------------------------------
// Provider 1: Google Gemini Vision API (used when GEMINI_API_KEY is set)
// --------------------------------------------------------------------------
async function analyzeWithGemini(base64: string, mime: string): Promise<PlantAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: buildAnalysisPrompt() },
              { inline_data: { mime_type: mime, data: base64 } },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
        },
      }),
      signal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
    }
  );

  if (!res.ok) {
    const status = res.status;
    if (status === 401 || status === 403)
      throw new Error("Gemini API key was rejected. Check GEMINI_API_KEY in .env.");
    if (status === 429)
      throw new Error("Gemini API rate limit reached. Please wait a moment and try again.");
    if (status === 404)
      throw new Error(`Gemini model "${GEMINI_MODEL}" not found. Check GEMINI_MODEL in .env.`);
    throw new Error(`Gemini API request failed (HTTP ${status}).`);
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned an empty response.");
  const raw = extractJsonObject(text);
  return normalizeResult(raw, "gemini", false, "");
}

// --------------------------------------------------------------------------
// Provider 2: Z.ai Vision (VLM) via z-ai-web-dev-sdk (this deployment)
// --------------------------------------------------------------------------
async function analyzeWithVision(base64: string, mime: string): Promise<PlantAnalysisResult> {
  const zai = await ZAI.create();
  const dataUrl = `data:${mime};base64,${base64}`;

  const response = await withTimeout(
    zai.chat.completions.createVision({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: buildAnalysisPrompt() },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
      thinking: { type: "disabled" },
    }),
    VISION_TIMEOUT_MS,
    "Vision analysis"
  );

  const text = response.choices?.[0]?.message?.content;
  if (!text) throw new Error("Vision model returned an empty response.");
  const raw = extractJsonObject(text);
  return normalizeResult(raw, "vision", false, "");
}

// --------------------------------------------------------------------------
// Provider 3: Demo Mode (clearly labeled sample data)
// --------------------------------------------------------------------------
function demoResult(base64: string, notice?: string): PlantAnalysisResult {
  let hash = 0;
  for (let i = 0; i < base64.length; i += 97) {
    hash = (hash * 31 + base64.charCodeAt(i)) | 0;
  }
  const result = getDemoAnalysis(hash);
  return notice ? { ...result, analysisNotice: notice } : result;
}

// --------------------------------------------------------------------------
// Public entry point
// --------------------------------------------------------------------------
export async function analyzePlantImage(input: AnalyzeInput): Promise<PlantAnalysisResult> {
  const { base64, mime, forceDemo } = input;

  // Explicit Demo Mode requested by the user
  if (forceDemo) return demoResult(base64);

  const errors: string[] = [];

  // 1) Gemini (if a key is configured)
  if (process.env.GEMINI_API_KEY) {
    try {
      return await analyzeWithGemini(base64, mime);
    } catch (err) {
      errors.push(`Gemini: ${(err as Error).message}`);
      console.error("[ai_service] Gemini provider failed:", (err as Error).message);
    }
  }

  // 2) Built-in vision model
  try {
    return await analyzeWithVision(base64, mime);
  } catch (err) {
    errors.push(`Vision: ${(err as Error).message}`);
    console.error("[ai_service] Vision provider failed:", (err as Error).message);
  }

  // 3) Demo Mode fallback - app always stays usable
  const notice =
    "AI providers are currently unreachable. Showing a Demo Mode sample result instead. " +
    (errors.length ? `Reason: ${errors[errors.length - 1]}` : "Configure an AI provider to enable live analysis.");
  return demoResult(base64, notice);
}

/** Reports which provider would currently serve requests (for the UI badge). */
export function getProviderStatus() {
  return {
    provider: process.env.GEMINI_API_KEY ? "gemini" : ("vision" as "gemini" | "vision"),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    hasPlantIdKey: Boolean(process.env.PLANT_ID_API_KEY),
    demoAvailable: true,
  };
}
