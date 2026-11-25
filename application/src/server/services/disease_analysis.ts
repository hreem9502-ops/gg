/**
 * PlantCare AI - Plant disease & health analysis service.
 * Builds the health/care instructions for the vision prompt and
 * validates/normalizes the disease-analysis part of the AI response.
 *
 * IMPORTANT GUARANTEE: results always describe *possible* problems based on
 * visible symptoms only - never a confirmed medical diagnosis.
 */
import { asString, asStringArray, asConfidence, asBoolean } from "./plant_identification";
import type { CareGuide, HealthAnalysis, HealthSeverity } from "../types";

export const DISEASE_ANALYSIS_PROMPT = `
HEALTH ANALYSIS TASK:
- Look for visible symptoms: yellowing leaves, brown spots, leaf discoloration,
  fungal-like symptoms, visible pest damage, wilting, dry or damaged leaf edges,
  or any other visible abnormality. List them in "observedSymptoms".
- If the plant looks healthy, set "hasVisibleSymptoms": false and say so.
- "possibleProblem" must describe the most likely problem(s) using cautious
  language ("possibly", "may indicate"). NEVER claim a disease is confirmed from
  a photograph. If the image is unclear, lower the confidence and add an
  uncertaintyNote explaining what cannot be determined.
- "severity" is one of: "none", "low", "moderate", "high", or "unknown".
- Provide practical "recommendedActions" and "preventionAdvice" lists.

CARE GUIDE TASK:
- For the identified plant, provide species-appropriate care advice:
  watering, sunlight, soil, temperature, humidity, fertilization, pruning,
  and 2-5 general maintenance tips.
- The advice must match the real requirements of the identified species,
  not generic advice that contradicts the plant's actual needs.`;

const SEVERITIES: HealthSeverity[] = ["none", "low", "moderate", "high", "unknown"];

export function normalizeHealth(raw: unknown): HealthAnalysis {
  const h = (raw ?? {}) as Record<string, unknown>;
  const severity = asString(h.severity).toLowerCase() as HealthSeverity;
  return {
    hasVisibleSymptoms: asBoolean(h.hasVisibleSymptoms),
    observedSymptoms: asStringArray(h.observedSymptoms),
    possibleProblem: asString(h.possibleProblem),
    possibleCauses: asStringArray(h.possibleCauses),
    recommendedActions: asStringArray(h.recommendedActions),
    preventionAdvice: asStringArray(h.preventionAdvice),
    severity: SEVERITIES.includes(severity) ? severity : "unknown",
    confidence: asConfidence(h.confidence),
    uncertaintyNote: asString(h.uncertaintyNote),
  };
}

export function normalizeCare(raw: unknown): CareGuide {
  const c = (raw ?? {}) as Record<string, unknown>;
  return {
    watering: asString(c.watering),
    sunlight: asString(c.sunlight),
    soil: asString(c.soil),
    temperature: asString(c.temperature),
    humidity: asString(c.humidity),
    fertilization: asString(c.fertilization),
    pruning: asString(c.pruning),
    maintenance: asStringArray(c.maintenance),
  };
}
