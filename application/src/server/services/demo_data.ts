/**
 * PlantCare AI - Demo Mode sample data.
 *
 * Used ONLY when: (a) the user explicitly enables Demo Mode, or
 * (b) no AI provider is reachable / no API key is configured.
 * Results are clearly labeled so they can never be mistaken for
 * a live AI analysis.
 */
import type { PlantAnalysisResult } from "../types";

const DEMO_NOTICE =
  "Demo Mode: this is a pre-written sample result, not a live AI analysis. Configure an AI provider (e.g. GEMINI_API_KEY in .env) to enable real image analysis.";

const healthyMonstera: PlantAnalysisResult = {
  isPlant: true,
  plant: {
    commonName: "Monstera",
    scientificName: "Monstera deliciosa",
    category: "Houseplant",
    description:
      "A popular tropical houseplant recognized by its large, glossy, split leaves with natural leaf holes called fenestrations. It grows as a climbing vine in its native Central American rainforests.",
    characteristics: [
      "Large heart-shaped leaves with splits and holes",
      "Glossy dark green foliage",
      "Climbing growth habit with aerial roots",
      "Fast growth in warm, humid conditions",
    ],
    growingEnvironment:
      "Tropical environments; indoors near a bright window, outdoors in shade in warm climates.",
    confidence: 0.91,
  },
  health: {
    hasVisibleSymptoms: false,
    observedSymptoms: [],
    possibleProblem: "No visible health problems detected",
    possibleCauses: [],
    recommendedActions: [
      "Keep the current watering routine",
      "Dust the leaves monthly so they can absorb light",
      "Rotate the plant a quarter turn each week for even growth",
    ],
    preventionAdvice: [
      "Avoid overwatering - the topsoil should dry slightly between waterings",
      "Maintain moderate humidity around the leaves",
    ],
    severity: "none",
    confidence: 0.82,
    uncertaintyNote: "",
  },
  care: {
    watering:
      "Water when the top 2-3 cm of soil feels dry (roughly once a week in summer, less in winter).",
    sunlight: "Bright, indirect light. Avoid harsh direct midday sun.",
    soil: "Airy, well-draining potting mix with perlite or orchid bark.",
    temperature: "18-27 C; keep above 15 C.",
    humidity: "Prefers 60%+ humidity; mist or use a pebble tray.",
    fertilization: "Balanced liquid fertilizer monthly during spring and summer.",
    pruning: "Trim yellow or damaged leaves at the base; trim wayward stems in spring.",
    maintenance: [
      "Wipe leaves with a damp cloth to remove dust",
      "Provide a moss pole for climbing support",
      "Check for spider mites under the leaves",
    ],
  },
  disclaimer:
    "Demo sample only. Plant care suggestions are informational and not a confirmed botanical or pathological assessment.",
  source: "demo",
  demo: true,
  analysisNotice: DEMO_NOTICE,
};

const tomatoBlight: PlantAnalysisResult = {
  isPlant: true,
  plant: {
    commonName: "Tomato",
    scientificName: "Solanum lycopersicum",
    category: "Vegetable crop",
    description:
      "A common vegetable crop grown for its edible fruit. The image shows tomato foliage with several affected leaves.",
    characteristics: [
      "Compound leaves along upright stems",
      "Small yellow flowers when present",
      "Fruiting vegetable plant, often staked or caged",
    ],
    growingEnvironment: "Warm, sunny gardens or greenhouses with rich soil.",
    confidence: 0.84,
  },
  health: {
    hasVisibleSymptoms: true,
    observedSymptoms: [
      "Dark brown to black spots on leaves",
      "Yellowing of leaf tissue around the spots",
      "Some leaf edges appear dry and curled",
    ],
    possibleProblem:
      "The symptoms may indicate early blight (Alternaria) or a bacterial leaf spot; a fungal-like infection is possible but not confirmed from a photo alone.",
    possibleCauses: [
      "Fungal infection favoured by humid, wet-foliage conditions",
      "Water splashing soil onto the leaves while watering",
      "Crowded planting limiting airflow",
    ],
    recommendedActions: [
      "Remove and dispose of badly affected leaves (do not compost them)",
      "Water at the base of the plant, keeping leaves dry",
      "Improve air circulation around the plant",
      "Consider applying an appropriate fungicide if the problem spreads",
    ],
    preventionAdvice: [
      "Mulch around plants to stop soil splash",
      "Rotate crops between seasons",
      "Inspect leaves weekly during humid weather",
    ],
    severity: "moderate",
    confidence: 0.74,
    uncertaintyNote:
      "Diagnosis cannot be confirmed from a photograph - a lab or field inspection would be required. Similar spots can also be caused by nutrient stress or sunscald.",
  },
  care: {
    watering: "Deep watering 2-3 times a week, at the base, in the morning.",
    sunlight: "Full sun, 6-8 hours of direct light daily.",
    soil: "Rich, well-draining soil with compost; pH 6.2-6.8.",
    temperature: "21-29 C during the day; above 13 C at night.",
    humidity: "Moderate; avoid prolonged wet foliage.",
    fertilization: "Balanced tomato fertilizer every 2-3 weeks once fruit sets.",
    pruning: "Remove lower side shoots and any yellowing leaves.",
    maintenance: [
      "Stake or cage plants early",
      "Check the undersides of leaves weekly for pests",
      "Harvest fruit as it ripens to keep the plant productive",
    ],
  },
  disclaimer:
    "Demo sample only. The disease description is illustrative and is not a confirmed scientific diagnosis.",
  source: "demo",
  demo: true,
  analysisNotice: DEMO_NOTICE,
};

const peaceLilyYellowing: PlantAnalysisResult = {
  isPlant: true,
  plant: {
    commonName: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    category: "Houseplant",
    description:
      "An elegant shade-loving houseplant with dark green lance-shaped leaves and white spoon-like flowers. The photographed plant shows early leaf yellowing.",
    characteristics: [
      "Glossy lance-shaped dark green leaves",
      "White hooded flowers on tall stems",
      "Tolerates low light better than most houseplants",
    ],
    growingEnvironment: "Shady tropical understory; indoor low-to-medium light.",
    confidence: 0.88,
  },
  health: {
    hasVisibleSymptoms: true,
    observedSymptoms: ["Lower leaves turning pale yellow", "Slight drooping of foliage"],
    possibleProblem:
      "Yellowing may be an early sign of overwatering, or of natural aging of older leaves; a mild care imbalance is possible.",
    possibleCauses: [
      "Soil kept too wet for too long",
      "Normal aging of the oldest leaves",
      "Very low light over a long period",
    ],
    recommendedActions: [
      "Let the top of the soil dry slightly before the next watering",
      "Move the plant to bright indirect light",
      "Trim fully yellow leaves with clean scissors",
    ],
    preventionAdvice: [
      "Use a pot with drainage holes",
      "Water only when leaves start to soften slightly",
    ],
    severity: "low",
    confidence: 0.7,
    uncertaintyNote: "Photographs cannot confirm the cause of yellowing; root condition should be checked if it worsens.",
  },
  care: {
    watering: "Keep soil lightly moist; water when the top centimetre dries or leaves soften.",
    sunlight: "Low to medium indirect light; keep out of direct sun.",
    soil: "Peaty, well-draining potting mix.",
    temperature: "18-26 C; away from cold drafts.",
    humidity: "Enjoys high humidity; mist leaves weekly.",
    fertilization: "Diluted balanced feed every 6-8 weeks in the growing season.",
    pruning: "Remove yellow or brown leaves and spent flowers at the base.",
    maintenance: [
      "Wipe leaves monthly",
      "Flush the soil with plain water occasionally to avoid salt build-up",
    ],
  },
  disclaimer:
    "Demo sample only. Suggestions are general plant-care guidance, not a confirmed diagnosis.",
  source: "demo",
  demo: true,
  analysisNotice: DEMO_NOTICE,
};

const notAPlant: PlantAnalysisResult = {
  isPlant: false,
  plant: {
    commonName: "",
    scientificName: "",
    category: "",
    description:
      "The uploaded image cannot be identified as a plant. PlantCare AI only analyzes photographs of plants (leaves, flowers, stems, or whole plants).",
    characteristics: [],
    growingEnvironment: "",
    confidence: null,
  },
  health: {
    hasVisibleSymptoms: false,
    observedSymptoms: [],
    possibleProblem: "",
    possibleCauses: [],
    recommendedActions: ["Please upload a clear photograph of a plant to run an analysis"],
    preventionAdvice: [],
    severity: "unknown",
    confidence: null,
    uncertaintyNote: "",
  },
  care: {
    watering: "",
    sunlight: "",
    soil: "",
    temperature: "",
    humidity: "",
    fertilization: "",
    pruning: "",
    maintenance: [],
  },
  disclaimer: "Demo sample only.",
  source: "demo",
  demo: true,
  analysisNotice: DEMO_NOTICE,
};

const SAMPLES = [healthyMonstera, tomatoBlight, peaceLilyYellowing];

/**
 * Picks a deterministic demo sample based on a simple hash of the image bytes,
 * so the same picture returns the same sample across refreshes.
 */
export function getDemoAnalysis(imageHash: number): PlantAnalysisResult {
  return SAMPLES[Math.abs(imageHash) % SAMPLES.length];
}

export function getNotAPlantDemo(): PlantAnalysisResult {
  return notAPlant;
}
