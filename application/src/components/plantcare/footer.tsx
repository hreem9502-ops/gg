"use client";

import { useI18n } from "./i18n-provider";
import { LeafLogo } from "./leaf-logo";
import { Sprout } from "lucide-react";

const STUDENTS = [
  "Jory Mohiuddin",
  "Dima Sami",
  "Rona Sharif",
  "Sadeem Al-Thaqafi",
  "Warda Al-Barqi",
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-auto w-full border-t border-border/70 bg-secondary/30 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6">
        <div className="flex items-center gap-2">
          <LeafLogo className="h-8 w-8" />
          <div className="text-start">
            <p className="font-display text-base font-semibold leading-tight">PlantCare AI</p>
            <p className="text-xs text-muted-foreground">{t("footer.tagline")}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground/80">{t("footer.students")}:</span>
          {STUDENTS.map((name, i) => (
            <span key={name} className="inline-flex items-center gap-1.5">
              {i > 0 && <Sprout className="h-3 w-3 text-primary/50" />}
              {name}
            </span>
          ))}
        </div>

        <p className="max-w-2xl text-[11px] leading-relaxed text-muted-foreground/80">
          {t("footer.disclaimer")}
        </p>
        <p className="text-[11px] text-muted-foreground/70">
          © {new Date().getFullYear()} PlantCare AI · {t("footer.educational")}
        </p>
      </div>
    </footer>
  );
}
