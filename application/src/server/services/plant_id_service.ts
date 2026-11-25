/**
 * PlantCare AI - OPTIONAL Plant.id integration.
 *
 * Plant.id (https://plant.id/) is a dedicated plant-identification API.
 * When PLANT_ID_API_KEY is configured in .env, the app enriches results with
 * Plant.id's identification. It fails silently (the primary AI analysis still
 * works) and never exposes the key to the client.
 */
import { asConfidence } from "./plant_identification";

interface PlantIdSuggestion {
  plant_name: string;
  scientific_name?: string;
  probability?: number;
  plant_details?: {
    common_names?: string[];
    taxonomy?: { family?: string };
    description?: { value?: string } | string;
    entity?: string;
  };
}

interface PlantIdResponse {
  suggestions?: PlantIdSuggestion[];
}

export interface PlantIdEnrichment {
  matched: boolean;
  commonName?: string;
  scientificName?: string;
  probability?: number | null;
  family?: string;
  genus?: string;
}

const PLANT_ID_URL = "https://plant.id/api/v2/identify";
const TIMEOUT_MS = 30_000;

export async function enrichWithPlantId(
  base64: string
): Promise<PlantIdEnrichment | null> {
  const apiKey = process.env.PLANT_ID_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(PLANT_ID_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey,
      },
      body: JSON.stringify({
        images: [`data:image/jpeg;base64,${base64}`],
        similar_images: false,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error(`[plant_id] request failed (HTTP ${res.status})`);
      return null;
    }

    const data = (await res.json()) as PlantIdResponse;
    const best = data.suggestions?.[0];
    if (!best) return null;

    return {
      matched: true,
      commonName: best.plant_details?.common_names?.[0] || best.plant_name,
      scientificName: best.scientific_name,
      probability: asConfidence(best.probability),
      family: best.plant_details?.taxonomy?.family,
      genus: best.plant_details?.entity,
    };
  } catch (err) {
    console.error("[plant_id] enrichment failed:", (err as Error).message);
    return null;
  }
}
