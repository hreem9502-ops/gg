"use client";

import { motion } from "framer-motion";
import { useI18n } from "./i18n-provider";
import { PlantCard } from "./plant-card";
import type { PlantSummary, View } from "./types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  UploadCloud,
  Sparkles,
  FileHeart,
  BookOpen,
  ScanSearch,
  HeartPulse,
  Leaf,
  History,
  Sprout,
  ArrowRight,
  ArrowLeft,
  FolderOpen,
  CircleAlert,
} from "lucide-react";

/* ------------------------- How it works ------------------------- */
export function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { icon: UploadCloud, title: t("how.step1.title"), desc: t("how.step1.desc") },
    { icon: Sparkles, title: t("how.step2.title"), desc: t("how.step2.desc") },
    { icon: FileHeart, title: t("how.step3.title"), desc: t("how.step3.desc") },
  ];
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <h2 className="text-center font-display text-3xl font-semibold tracking-tight">
        {t("how.title")}
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="h-full rounded-2xl border-border/80 bg-card">
              <CardContent className="flex h-full flex-col items-center gap-3 p-6 text-center">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-4xl font-semibold text-primary/25">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------- Features ------------------------- */
export function Features() {
  const { t } = useI18n();
  const features = [
    { icon: BookOpen, title: t("features.identify.title"), desc: t("features.identify.desc") },
    { icon: HeartPulse, title: t("features.detect.title"), desc: t("features.detect.desc") },
    { icon: Leaf, title: t("features.care.title"), desc: t("features.care.desc") },
    { icon: History, title: t("features.history.title"), desc: t("features.history.desc") },
  ];
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <h2 className="text-center font-display text-3xl font-semibold tracking-tight">
        {t("features.title")}
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card className="group h-full rounded-2xl border-border/80 bg-card transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10">
              <CardContent className="flex h-full flex-col gap-2 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------- Recent analyses ------------------------- */
export function RecentAnalyses({
  plants,
  onOpenPlant,
  setView,
}: {
  plants: PlantSummary[];
  onOpenPlant: (plant: PlantSummary) => void;
  setView: (v: View) => void;
}) {
  const { t, dir } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const recent = plants.slice(0, 8);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-3xl font-semibold tracking-tight">{t("recent.title")}</h2>
        <Button variant="outline" size="sm" className="gap-1.5 rounded-full" onClick={() => setView("plants")}>
          {t("recent.viewAll")}
          <Arrow className="h-4 w-4" />
        </Button>
      </div>

      {recent.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-primary/25 bg-card px-6 py-12 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ScanSearch className="h-7 w-7" />
          </span>
          <p className="max-w-sm text-sm text-muted-foreground">{t("recent.empty")}</p>
          <Button size="sm" className="rounded-full" onClick={() => setView("scan")}>
            {t("hero.start")}
          </Button>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto scrollbar-organic pe-2">
          <div className="grid gap-4 pb-2 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((plant) => (
              <PlantCard key={plant.id} plant={plant} onOpen={onOpenPlant} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------- My Plants (home section) ------------------------- */
export function MyPlantsSection({
  plants,
  setView,
}: {
  plants: PlantSummary[];
  setView: (v: View) => void;
}) {
  const { t, lang } = useI18n();

  const countLabel =
    plants.length === 0
      ? t("plants.count.none")
      : `${plants.length} ${
          plants.length === 1 ? t("plants.count.singular") : t("plants.count.plural")
        }`;

  const totalScans = plants.length;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <Card className="overflow-hidden rounded-3xl border-primary/15 bg-gradient-to-br from-secondary/70 via-card to-accent/40">
        <CardContent className="flex flex-col items-center justify-between gap-6 p-6 sm:flex-row sm:p-8">
          <div className="flex items-center gap-4 text-center sm:text-start">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sprout className="h-7 w-7" />
            </span>
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("plantsSection.title")}
              </h2>
              <p className="text-sm text-muted-foreground">{t("plantsSection.desc")}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="text-sm font-medium text-secondary-foreground">{countLabel}</span>
            <div className="flex flex-wrap justify-center gap-2">
              <Button className="rounded-full" onClick={() => setView("plants")}>
                <FolderOpen className="me-2 h-4 w-4" />
                {t("plantsSection.open")}
              </Button>
              <Button variant="outline" className="rounded-full" onClick={() => setView("scan")}>
                <ScanSearch className="me-2 h-4 w-4" />
                {t("plantsSection.new")}
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">
              {t("plants.countOfAnalyses")}: {totalScans} ·{" "}
              {new Date().toLocaleDateString(lang === "ar" ? "ar" : "en-GB", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* ------------------------- Section shell ------------------------- */
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center font-display text-3xl font-semibold tracking-tight">{children}</h2>
  );
}

export function InfoAlert({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-border/80 bg-muted/60 p-3 text-sm text-muted-foreground">
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
      {text}
    </div>
  );
}
