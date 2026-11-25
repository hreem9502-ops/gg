"use client";

/**
 * PlantCare AI — Android-style bottom navigation bar (Material 3 inspired).
 * Visible on mobile only; the desktop header handles navigation there.
 * Includes safe-area-inset support for notched phones in standalone mode.
 */
import { House, ScanSearch, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "./i18n-provider";
import type { View } from "./types";

interface BottomNavProps {
  view: View;
  setView: (v: View) => void;
}

export function BottomNav({ view, setView }: BottomNavProps) {
  const { t } = useI18n();

  const items: { key: View; label: string; icon: React.ElementType }[] = [
    { key: "home", label: t("nav.home"), icon: House },
    { key: "scan", label: t("nav.scan"), icon: ScanSearch },
    { key: "plants", label: t("nav.plants"), icon: Sprout },
  ];

  return (
    <nav
      aria-label={t("nav.home")}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/88 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex w-full max-w-md items-stretch justify-around px-2">
        {items.map(({ key, label, icon: Icon }) => {
          const active = view === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setView(key)}
              aria-current={active ? "page" : undefined}
              className="flex min-h-[60px] min-w-[44px] flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring active:bg-secondary/60"
            >
              <span
                className={cn(
                  "flex h-8 w-16 items-center justify-center rounded-full transition-all duration-200",
                  active ? "bg-secondary" : "bg-transparent"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                  strokeWidth={active ? 2.4 : 2}
                />
              </span>
              <span
                className={cn(
                  "text-[11px] leading-none transition-colors",
                  active ? "font-bold text-primary" : "font-medium text-muted-foreground"
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
