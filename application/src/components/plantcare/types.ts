import type { PlantAnalysisResult } from "@/server/types";

export type View = "home" | "scan" | "plants";

export interface PlantSummary {
  id: string;
  commonName: string;
  scientificName: string | null;
  category: string | null;
  isPlant: boolean;
  healthStatus: string;
  confidence: number | null;
  source: string;
  thumbUrl: string | null;
  createdAt: string;
}

export interface PlantRecord extends PlantSummary {
  description: string | null;
  imageUrl: string | null;
  analysisJson: string | null;
}

export type { PlantAnalysisResult };

/** Derived health status stored with each saved scan. */
export function deriveHealthStatus(result: PlantAnalysisResult): string {
  if (!result.isPlant) return "notplant";
  if (!result.health.hasVisibleSymptoms) return "healthy";
  switch (result.health.severity) {
    case "low":
      return "attention";
    case "moderate":
      return "attention";
    case "high":
      return "concern";
    default:
      return "unknown";
  }
}

export const HEALTH_STATUS_META: Record<
  string,
  { color: string; labelKey: "severity.none" | "severity.low" | "severity.moderate" | "severity.high" | "severity.unknown" | "result.notPlant.title" }
> = {
  healthy: { color: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300", labelKey: "severity.none" },
  attention: { color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300", labelKey: "severity.low" },
  concern: { color: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300", labelKey: "severity.high" },
  unknown: { color: "bg-stone-100 text-stone-700 dark:bg-stone-900 dark:text-stone-300", labelKey: "severity.unknown" },
  notplant: { color: "bg-stone-100 text-stone-700 dark:bg-stone-900 dark:text-stone-300", labelKey: "result.notPlant.title" },
};
