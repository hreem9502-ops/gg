"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useI18n } from "./i18n-provider";
import { AnalysisResult } from "./analysis-result";
import { HEALTH_STATUS_META, type PlantAnalysisResult, type PlantSummary } from "./types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlantDetailDialogProps {
  plant: PlantSummary | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (plant: PlantSummary) => void;
}

export function PlantDetailDialog({ plant, open, onOpenChange, onDelete }: PlantDetailDialogProps) {
  const { t } = useI18n();

  if (!plant) return null;

  const meta = HEALTH_STATUS_META[plant.healthStatus] ?? HEALTH_STATUS_META.unknown;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-hidden rounded-2xl sm:max-w-3xl">
        <DialogHeader className="text-start">
          <DialogTitle className="font-display text-xl">{t("history.detail")}</DialogTitle>
          <DialogDescription className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-foreground">
              {plant.commonName}
              {plant.scientificName && (
                <span className="ms-2 text-xs italic text-muted-foreground">
                  {plant.scientificName}
                </span>
              )}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.color}`}>
              {t(meta.labelKey)}
            </span>
          </DialogDescription>
        </DialogHeader>

        <PlantDetailContent key={plant.id} plant={plant} />

        <div className="flex justify-end">
          <Button
            variant="outline"
            className="gap-1.5 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(plant)}
          >
            <Trash2 className="h-4 w-4" />
            {t("history.delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Keyed inner component - remounts per plant so loading state starts fresh
 * and fetch state updates happen inside async callbacks only.
 */
function PlantDetailContent({ plant }: { plant: PlantSummary }) {
  const { t, lang } = useI18n();
  const [record, setRecord] = useState<PlantAnalysisResult | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const reqId = useRef(0);

  useEffect(() => {
    const id = ++reqId.current;
    fetch(`/api/plants/${plant.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (id !== reqId.current) return;
        if (data.ok) {
          setImageUrl(data.plant.imageUrl ?? null);
          try {
            setRecord(data.plant.analysisJson ? JSON.parse(data.plant.analysisJson) : null);
          } catch {
            setRecord(null);
          }
        } else {
          toast.error(data.error || t("toast.deleteFailed"));
        }
      })
      .catch(() => {
        if (id === reqId.current) toast.error(t("toast.deleteFailed"));
      })
      .finally(() => {
        if (id === reqId.current) setLoading(false);
      });
    return () => {
      reqId.current++;
    };
  }, [plant.id, t]);

  const date = new Date(plant.createdAt).toLocaleDateString(lang === "ar" ? "ar" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <ScrollArea className="max-h-[65vh] pe-2">
      <div className="p-1">
        {loading ? (
          <div className="flex h-64 flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="text-sm">Loading…</span>
          </div>
        ) : record ? (
          <AnalysisResult result={record} imageUrl={imageUrl} mode="saved" savedDate={date} />
        ) : (
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            {plant.description || t("result.notPlant.desc")}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
