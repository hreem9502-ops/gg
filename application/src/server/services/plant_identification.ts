/**
 * PlantCare AI - Plant identification service.
 * Builds the identification instructions for the vision prompt and
 * validates/normalizes the identification part of the AI response.
 */
import type { PlantIdentification } from "../types";

/**
 * Instruction block for plant identification sent to the vision model.
 * Keeps the model honest: no invented identities, confidence only when real.
 */
export const PLANT_IDENTIFICATION_PROMPT = `
IDENTIFICATION TASK:
- Identify the plant in the image. Provide: commonName, scientificName, category
  (e.g. "Houseplant", "Flowering plant", "Succulent", "Tree", "Vegetable crop", "Herb", "Fern", "Palm"),
  a short description (2-3 sentences), 3-6 key characteristics, and the suitable growing environment.
- "confidence" must be a number between 0 and 1 reflecting how certain you actually are,
  or null when the identification is unreliable.
- NEVER invent a plant identity. If you cannot identify the species with reasonable
  certainty, set confidence low/null and say so honestly in the description.
- If the image does not contain a plant, set "isPlant": false, leave the plant fields
  empty strings/empty arrays and explain in "description" that the image cannot be
  identified as a plant.`;

/**
 * Normalizes the identification part of a raw AI response.
 */
export function normalizeIdentification(raw: unknown): PlantIdentification {
  const p = (raw ?? {}) as Record<string, unknown>;
  return {
    commonName: asString(p.commonName) || "Unknown plant",
    scientificName: asString(p.scientificName),
    category: asString(p.category),
    description: asString(p.description),
    characteristics: asStringArray(p.characteristics),
    growingEnvironment: asString(p.growingEnvironment),
    confidence: asConfidence(p.confidence),
  };
}

// ---------- small safe coercers (AI output is never trusted) ----------

export function asString(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return "";
}

export function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) {
    // Some models answer ["item1; item2"] or "item1, item2" - split gracefully
    const single = asString(v);
    if (!single) return [];
    return single
      .split(/;|,/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return v.map((x) => asString(x)).filter(Boolean);
}

export function asConfidence(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) {
    if (v > 1) return Math.min(v / 100, 1); // "85" -> 0.85
    return Math.max(0, Math.min(v, 1));
  }
  if (typeof v === "string") {
    const m = v.match(/(\d+(?:\.\d+)?)\s*%?/);
    if (m) {
      const num = parseFloat(m[1]);
      return num > 1 ? Math.min(num / 100, 1) : num;
    }
  }
  return null;
}

export function asBoolean(v: unknown, fallback = false): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return /^(true|yes)$/i.test(v.trim());
  return fallback;
}
