"use client";

import { LeafLogo } from "./leaf-logo";
import { useI18n } from "./i18n-provider";
import type { View } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "next-themes";
import {
  House,
  ScanSearch,
  Sprout,
  Languages,
  Moon,
  Sun,
  Sparkles,
  FlaskConical,
  Info,
} from "lucide-react";
import { useSyncExternalStore } from "react";

interface HeaderProps {
  view: View;
  setView: (v: View) => void;
  provider: { provider: string; hasGeminiKey: boolean; hasPlantIdKey: boolean } | null;
  demoMode: boolean;
  setDemoMode: (v: boolean) => void;
}

export function Header({ view, setView, provider, demoMode, setDemoMode }: HeaderProps) {
  const { t, lang, setLang } = useI18n();
  const { theme, setTheme } = useTheme();
  // Avoid SSR/theme hydration mismatch without sync setState in effects
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const navItems: { key: View; label: string; icon: React.ElementType }[] = [
    { key: "home", label: t("nav.home"), icon: House },
    { key: "scan", label: t("nav.scan"), icon: ScanSearch },
    { key: "plants", label: t("nav.plants"), icon: Sprout },
  ];

  const aiActive = !demoMode && provider?.provider !== "demo";

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        {/* Brand */}
        <button
          className="flex items-center gap-2.5 rounded-xl px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setView("home")}
          aria-label="PlantCare AI home"
        >
          <LeafLogo className="h-9 w-9 shrink-0" />
          <span className="flex flex-col items-start leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              PlantCare AI
            </span>
            <span className="hidden text-[11px] text-muted-foreground sm:inline-block">
              {t("app.tagline")}
            </span>
          </span>
        </button>

        {/* Nav */}
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {navItems.map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={view === key ? "secondary" : "ghost"}
              size="sm"
              className="h-9 gap-1.5 rounded-full px-2.5 text-sm sm:px-4"
              onClick={() => setView(key)}
              aria-current={view === key ? "page" : undefined}
            >
              <Icon className="h-4 w-4" />
              <span className={key === "scan" ? "hidden xs:inline sm:inline" : "hidden sm:inline"}>
                {label}
              </span>
              <span className="sr-only sm:not-sr-only sm:hidden">{label}</span>
            </Button>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* AI / Demo status */}
          {aiActive ? (
            <Badge
              variant="outline"
              className="hidden gap-1 rounded-full border-green-300 bg-green-50 text-green-800 md:inline-flex dark:border-green-800 dark:bg-green-950 dark:text-green-300"
            >
              <Sparkles className="h-3 w-3" />
              {t("mode.aiConnected")}
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="hidden gap-1 rounded-full border-amber-300 bg-amber-50 text-amber-800 md:inline-flex dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
            >
              <FlaskConical className="h-3 w-3" />
              {t("mode.demo")}
            </Badge>
          )}

          {/* Demo toggle */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" aria-label="Demo mode toggle">
                <FlaskConical className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="demo-switch" className="text-sm font-medium">
                    {t("mode.demoToggle")}
                  </label>
                  <Switch
                    id="demo-switch"
                    checked={demoMode}
                    onCheckedChange={setDemoMode}
                    aria-label={t("mode.demoToggle")}
                  />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{t("mode.demoHint")}</p>
              </div>
            </PopoverContent>
          </Popover>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle dark mode"
          >
            {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Language toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="h-9 gap-1 rounded-full px-2.5"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            aria-label="Switch language English Arabic"
          >
            <Languages className="h-4 w-4" />
            <span className="text-sm font-semibold">{lang === "en" ? "ع" : "EN"}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
