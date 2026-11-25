"use client";

import { useI18n } from "./i18n-provider";
import type { PlantAnalysisResult as Analysis } from "@/server/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sprout,
  BookOpen,
  ScanSearch,
  HeartPulse,
  Droplets,
  Sun,
  Mountain,
  Thermometer,
  CloudDrizzle,
  FlaskConical,
  Scissors,
  ListChecks,
  CircleCheck,
  CircleAlert,
  ShieldQuestion,
  Leaf,
  Save,
  Check,
  Loader2,
  Info,
} from "lucide-react";

export type { Analysis };

interface AnalysisResultProps {
  result: Analysis;
  imageUrl?: string | null;
  mode: "new" | "saved";
  saved?: boolean;
  saving?: boolean;
  onSave?: () => void;
  onNewScan?: () => void;
  savedDate?: string | null;
}

export function AnalysisResult({
  result,
  imageUrl,
  mode,
  saved = false,
  saving = false,
  onSave,
  onNewScan,
  savedDate,
}: AnalysisResultProps) {
  const { t, lang } = useI18n();

  const sourceLabel =
    result.source === "gemini"
      ? t("source.gemini")
      : result.source === "vision"
        ? t("source.vision")
        : t("source.demo");

  return (
    <div className="space-y-4">
      {/* Demo notice */}
      {result.demo && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-300/60 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-200">
          <FlaskConical className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{result.analysisNotice || t("result.demoBanner")}</span>
        </div>
      )}

      {/* Not a plant */}
      {!result.isPlant ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <ShieldQuestion className="h-8 w-8" />
            </span>
            <div className="max-w-md space-y-2">
              <h3 className="font-display text-xl font-semibold">{t("result.notPlant.title")}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {result.plant.description || t("result.notPlant.desc")}
              </p>
            </div>
            {result.health.recommendedActions.length > 0 && (
              <ul className="max-w-md space-y-1 text-sm text-muted-foreground">
                {result.health.recommendedActions.map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Plant header */}
          <Card className="overflow-hidden">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={result.plant.commonName}
                  className="h-28 w-28 shrink-0 rounded-2xl border object-cover sm:h-32 sm:w-32"
                />
              )}
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Sprout className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    {result.plant.commonName}
                  </h3>
                  {result.plant.category && (
                    <Badge variant="secondary" className="rounded-full">
                      {result.plant.category}
                    </Badge>
                  )}
                </div>
                {result.plant.scientificName && (
                  <p className="font-display text-sm italic text-muted-foreground">
                    {result.plant.scientificName}
                  </p>
                )}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{t("result.confidence")}</span>
                    <span className="font-semibold text-foreground">
                      {result.plant.confidence != null
                        ? `${Math.round(result.plant.confidence * 100)}%`
                        : t("result.noConfidence")}
                    </span>
                  </div>
                  <Progress
                    value={result.plant.confidence != null ? result.plant.confidence * 100 : 0}
                    className="h-1.5 max-w-64"
                    aria-label={t("result.confidence")}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("result.source")}: <span className="font-medium text-foreground">{sourceLabel}</span>
                  {savedDate && ` · ${t("history.savedOn")}: ${savedDate}`}
                </p>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="identification">
            <TabsList className="h-11 w-full justify-around rounded-full p-1 sm:w-auto">
              <TabsTrigger value="identification" className="flex-1 gap-1.5 rounded-full px-4 sm:flex-none">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">{t("result.identification")}</span>
              </TabsTrigger>
              <TabsTrigger value="health" className="flex-1 gap-1.5 rounded-full px-4 sm:flex-none">
                <HeartPulse className="h-4 w-4" />
                <span className="hidden sm:inline">{t("result.health")}</span>
              </TabsTrigger>
              <TabsTrigger value="care" className="flex-1 gap-1.5 rounded-full px-4 sm:flex-none">
                <Leaf className="h-4 w-4" />
                <span className="hidden sm:inline">{t("result.care")}</span>
              </TabsTrigger>
            </TabsList>

            {/* Identification */}
            <TabsContent value="identification" className="mt-3 space-y-3">
              <InfoCard icon={<BookOpen />} title={t("result.description")}>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {result.plant.description}
                </p>
              </InfoCard>
              {result.plant.characteristics.length > 0 && (
                <InfoCard icon={<Sprout />} title={t("result.characteristics")}>
                  <ul className="grid gap-1.5 sm:grid-cols-2">
                    {result.plant.characteristics.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </InfoCard>
              )}
              {result.plant.growingEnvironment && (
                <InfoCard icon={<Mountain />} title={t("result.environment")}>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {result.plant.growingEnvironment}
                  </p>
                </InfoCard>
              )}
            </TabsContent>

            {/* Health */}
            <TabsContent value="health" className="mt-3 space-y-3">
              <InfoCard icon={<HeartPulse />} title={t("result.symptoms")}>
                {result.health.hasVisibleSymptoms && result.health.observedSymptoms.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {result.health.observedSymptoms.map((s, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-200"
                      >
                        <CircleAlert className="h-3.5 w-3.5" />
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-800 dark:bg-green-950/60 dark:text-green-300">
                    <CircleCheck className="h-5 w-5" />
                    <span>
                      {t("result.noSymptoms")}
                      {result.health.hasVisibleSymptoms === false && (
                        <span className="block text-xs font-normal opacity-80">
                          {t("result.healthyNote")}
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </InfoCard>

              {result.health.possibleProblem && (
                <InfoCard
                  icon={<ScanSearch />}
                  title={t("result.possibleProblem")}
                  badge={t(`severity.${result.health.severity}`)}
                >
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {result.health.possibleProblem}
                  </p>
                </InfoCard>
              )}

              {result.health.possibleCauses.length > 0 && (
                <InfoCard icon={<Info />} title={t("result.causes")}>
                  <ul className="space-y-1.5">
                    {result.health.possibleCauses.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </InfoCard>
              )}

              {result.health.recommendedActions.length > 0 && (
                <InfoCard icon={<ListChecks />} title={t("result.actions")}>
                  <ol className="space-y-1.5">
                    {result.health.recommendedActions.map((a, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                          {i + 1}
                        </span>
                        {a}
                      </li>
                    ))}
                  </ol>
                </InfoCard>
              )}

              {result.health.preventionAdvice.length > 0 && (
                <InfoCard icon={<ShieldQuestion />} title={t("result.prevention")}>
                  <ul className="space-y-1.5">
                    {result.health.preventionAdvice.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </InfoCard>
              )}

              {(result.health.uncertaintyNote || result.health.confidence != null) && (
                <InfoCard icon={<Info />} title={t("result.uncertainty")}>
                  <div className="space-y-2">
                    {result.health.uncertaintyNote && (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {result.health.uncertaintyNote}
                      </p>
                    )}
                    {result.health.confidence != null && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{t("result.healthConfidence")}</span>
                          <span className="font-semibold text-foreground">
                            {Math.round(result.health.confidence * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={result.health.confidence * 100}
                          className="h-1.5 max-w-56"
                          aria-label={t("result.healthConfidence")}
                        />
                      </div>
                    )}
                  </div>
                </InfoCard>
              )}
            </TabsContent>

            {/* Care */}
            <TabsContent value="care" className="mt-3 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <CareCard icon={<Droplets />} title={t("result.care.watering")} text={result.care.watering} />
                <CareCard icon={<Sun />} title={t("result.care.sunlight")} text={result.care.sunlight} />
                <CareCard icon={<Mountain />} title={t("result.care.soil")} text={result.care.soil} />
                <CareCard icon={<Thermometer />} title={t("result.care.temperature")} text={result.care.temperature} />
                <CareCard icon={<CloudDrizzle />} title={t("result.care.humidity")} text={result.care.humidity} />
                <CareCard icon={<FlaskConical />} title={t("result.care.fertilization")} text={result.care.fertilization} />
                <CareCard icon={<Scissors />} title={t("result.care.pruning")} text={result.care.pruning} />
              </div>
              {result.care.maintenance.length > 0 && (
                <InfoCard icon={<ListChecks />} title={t("result.care.maintenance")}>
                  <ul className="space-y-1.5">
                    {result.care.maintenance.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </InfoCard>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Disclaimer */}
      {result.disclaimer && (
        <p className="rounded-xl border border-border/70 bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold">{t("result.disclaimer")}: </span>
          {result.disclaimer}
        </p>
      )}

      {/* Actions */}
      {mode === "new" && (
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          {onNewScan && (
            <Button variant="outline" className="rounded-full" onClick={onNewScan} disabled={saving}>
              {t("result.newScan")}
            </Button>
          )}
          {onSave && (
            <Button
              className="rounded-full px-6"
              onClick={onSave}
              disabled={saved || saving || !result.isPlant}
            >
              {saving ? (
                <>
                  <Loader2 className="me-2 h-4 w-4 animate-spin" />
                  {t("result.saving")}
                </>
              ) : saved ? (
                <>
                  <Check className="me-2 h-4 w-4" />
                  {t("result.saved")}
                </>
              ) : (
                <>
                  <Save className="me-2 h-4 w-4" />
                  {t("result.save")}
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function InfoCard({
  icon,
  title,
  badge,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl border-border/80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/80">
          <span className="text-primary">{icon}</span>
          {title}
        </CardTitle>
        {badge && (
          <Badge variant="outline" className="rounded-full text-xs font-medium">
            {badge}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pb-4">{children}</CardContent>
    </Card>
  );
}

function CareCard({ icon, title, text }: { icon: React.ReactNode; title: string; text?: string }) {
  if (!text) return null;
  return (
    <Card className="rounded-2xl border-border/80 transition-colors hover:border-primary/30">
      <CardContent className="flex gap-3 p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </span>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
        </div>
      </CardContent>
    </Card>
  );
}
