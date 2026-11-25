"use client";

import { useI18n } from "./i18n-provider";
import { HEALTH_STATUS_META, type PlantSummary } from "./types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, CalendarDays, Leaf } from "lucide-react";

interface PlantCardProps {
  plant: PlantSummary;
  onOpen: (plant: PlantSummary) => void;
}

export function PlantCard({ plant, onOpen }: PlantCardProps) {
  const { t, lang } = useI18n();
  const meta = HEALTH_STATUS_META[plant.healthStatus] ?? HEALTH_STATUS_META.unknown;

  const date = new Date(plant.createdAt).toLocaleDateString(lang === "ar" ? "ar" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card
      className="group cursor-pointer overflow-hidden rounded-2xl border-border/80 bg-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 focus-visible:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={() => onOpen(plant)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(plant);
        }
      }}
      aria-label={`${plant.commonName} - ${t("history.detail")}`}
    >
      <div className="relative h-40 w-full overflow-hidden bg-secondary/40">
        {plant.thumbUrl ? (
          <img
            src={plant.thumbUrl}
            alt={`${plant.commonName} thumbnail`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-primary/40">
            <Leaf className="h-12 w-12" />
          </div>
        )}
        <Badge className="absolute top-2 end-2 rounded-full text-xs shadow" variant="secondary">
          {plant.category || "Plant"}
        </Badge>
      </div>
      <CardContent className="space-y-1.5 p-3">
        <div className="flex items-center gap-1.5">
          <Sprout className="h-4 w-4 shrink-0 text-primary" />
          <h3 className="truncate font-display text-base font-semibold text-foreground">
            {plant.commonName}
          </h3>
        </div>
        {plant.scientificName && (
          <p className="truncate text-xs italic text-muted-foreground">{plant.scientificName}</p>
        )}
        <div className="flex items-center justify-between pt-1">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.color}`}
          >
            {t(meta.labelKey)}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            {date}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
