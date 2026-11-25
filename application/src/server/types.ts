/**
 * PlantCare AI - shared server types
 * Canonical shape of a full plant analysis result.
 */

export type AnalysisSource = "gemini" | "vision" | "plantid" | "demo";

export type HealthSeverity = "none" | "low" | "moderate" | "high" | "unknown";

export interface PlantIdentification {
  commonName: string;
  scientificName: string;
  category: string;
  description: string;
  characteristics: string[];
  growingEnvironment: string;
  confidence: number | null;
}

export interface HealthAnalysis {
  hasVisibleSymptoms: boolean;
  observedSymptoms: string[];
  possibleProblem: string;
  possibleCauses: string[];
  recommendedActions: string[];
  preventionAdvice: string[];
  severity: HealthSeverity;
  confidence: number | null;
  uncertaintyNote: string;
}

export interface CareGuide {
  watering: string;
  sunlight: string;
  soil: string;
  temperature: string;
  humidity: string;
  fertilization: string;
  pruning: string;
  maintenance: string[];
}

export interface PlantAnalysisResult {
  isPlant: boolean;
  plant: PlantIdentification;
  health: HealthAnalysis;
  care: CareGuide;
  disclaimer: string;
  source: AnalysisSource;
  demo: boolean;
  analysisNotice: string;
}

export interface AnalyzeInput {
  base64: string;
  mime: string;
  forceDemo?: boolean;
}
