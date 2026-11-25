"use client";

import { motion } from "framer-motion";
import { useI18n } from "./i18n-provider";
import type { View } from "./types";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Sprout,
  ScanSearch,
  FlaskConical,
  Sparkles,
} from "lucide-react";

interface HeroProps {
  setView: (v: View) => void;
  totalScans: number;
  totalPlants: number;
  demoAvailable: boolean;
}

export function Hero({ setView, totalScans, totalPlants, demoAvailable }: HeroProps) {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      {/* Soft botanical glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 end-[-8rem] h-96 w-96 rounded-full bg-accent/50 blur-3xl opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 start-[-6rem] h-80 w-80 rounded-full bg-secondary/60 blur-3xl opacity-60"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pb-20 lg:pt-16">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <Sprout className="h-4 w-4" />
            {t("hero.welcome")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            PlantCare{" "}
            <span className="italic text-primary">
              AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-3 max-w-xl text-lg font-medium text-secondary-foreground/90 sm:text-xl lg:mx-0"
          >
            {t("app.tagline")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button
              size="lg"
              className="h-12 rounded-full px-7 text-base shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
              onClick={() => setView("scan")}
            >
              <ScanSearch className="me-2 h-5 w-5" />
              {t("hero.start")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full px-7 text-base"
              onClick={() => setView("scan")}
            >
              <Upload className="me-2 h-5 w-5" />
              {t("hero.upload")}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <StatChip
              icon={<Sparkles className="h-4 w-4" />}
              value={totalScans.toString()}
              label={t("hero.stat.scans")}
            />
            <StatChip
              icon={<Sprout className="h-4 w-4" />}
              value={totalPlants.toString()}
              label={t("hero.stat.plants")}
            />
            {demoAvailable && (
              <StatChip
                icon={<FlaskConical className="h-4 w-4" />}
                value="100%"
                label={t("hero.stat.demo")}
              />
            )}
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative z-10 mx-auto w-full max-w-md lg:max-w-lg"
        >
          <div className="relative rounded-[2rem] border border-primary/15 bg-card p-3 shadow-xl shadow-primary/10">
            <img
              src="/hero-plant.png"
              alt="Healthy monstera plant with large green leaves"
              className="aspect-[4/5] w-full rounded-[1.6rem] object-cover"
            />
            {/* floating result chip */}
            <div className="absolute bottom-6 start-6 flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sprout className="h-3.5 w-3.5" />
              </span>
              Monstera deliciosa
            </div>
            <div className="absolute top-6 end-6 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-green-700 shadow-lg backdrop-blur dark:text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              92% healthy
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatChip({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-2 shadow-sm">
      <span className="text-primary">{icon}</span>
      <span className="text-sm font-bold text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
