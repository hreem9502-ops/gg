"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { I18nProvider, useI18n } from "./i18n-provider";
import { Header } from "./header";
import { Hero } from "./hero";
import { HowItWorks, Features, RecentAnalyses, MyPlantsSection } from "./home-sections";
import { Scanner } from "./scanner";
import { HistoryView } from "./history-view";
import { Deliverables } from "./deliverables";
import { Footer } from "./footer";
import { PlantDetailDialog } from "./plant-detail-dialog";
import { BottomNav } from "./bottom-nav";
import { PwaRegister } from "./pwa-register";
import type { PlantSummary, View } from "./types";

function PlantCareShell() {
  const { t } = useI18n();
  const [view, setView] = useState<View>("home");
  const [provider, setProvider] = useState<{
    provider: string;
    hasGeminiKey: boolean;
    hasPlantIdKey: boolean;
  } | null>(null);
  const [demoMode, setDemoModeState] = useState(false);
  const [plants, setPlants] = useState<PlantSummary[]>([]);
  const [loadingPlants, setLoadingPlants] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState<PlantSummary | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PlantSummary | null>(null);

  // PWA shortcuts (/?view=scan, /?view=plants) decide the starting view.
  useEffect(() => {
    try {
      const param = new URLSearchParams(window.location.search).get("view");
      if (param === "scan" || param === "plants" || param === "home") {
        setView(param);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Load provider config
  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((d) => setProvider({ provider: d.provider, hasGeminiKey: d.hasGeminiKey, hasPlantIdKey: d.hasPlantIdKey }))
      .catch(() => undefined);
  }, []);

  // Demo-mode preference (persisted)
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("plantcare_demo");
      if (saved === "true") setDemoModeState(true);
    } catch {
      /* ignore */
    }
  }, []);

  const setDemoMode = useCallback((next: boolean) => {
    setDemoModeState(next);
    try {
      window.localStorage.setItem("plantcare_demo", String(next));
    } catch {
      /* ignore */
    }
  }, []);

  const refreshPlants = useCallback(async () => {
    try {
      const res = await fetch("/api/plants");
      const data = await res.json();
      if (data.ok) setPlants(data.plants as PlantSummary[]);
    } catch {
      /* silent - retry on next action */
    } finally {
      setLoadingPlants(false);
    }
  }, []);

  useEffect(() => {
    void refreshPlants();
  }, [refreshPlants]);

  const openPlant = useCallback((plant: PlantSummary) => {
    setSelectedPlant(plant);
    setDetailOpen(true);
  }, []);

  const requestDelete = useCallback((plant: PlantSummary) => {
    setDetailOpen(false);
    setDeleteTarget(plant);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/plants/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || t("toast.deleteFailed"));
      setPlants((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast.success(t("toast.deleted"));
    } catch (err) {
      toast.error((err as Error).message || t("toast.deleteFailed"));
    } finally {
      setDeleteTarget(null);
    }
  }, [deleteTarget, t]);

  const changeView = useCallback((v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground pb-[calc(66px+env(safe-area-inset-bottom))] md:pb-0">
      <Header view={view} setView={changeView} provider={provider} demoMode={demoMode} setDemoMode={setDemoMode} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {view === "home" && (
              <>
                <Hero
                  setView={changeView}
                  totalScans={plants.length}
                  totalPlants={plants.length}
                  demoAvailable
                />
                <HowItWorks />
                <Features />
                <RecentAnalyses plants={plants} onOpenPlant={openPlant} setView={changeView} />
                <MyPlantsSection plants={plants} setView={changeView} />
                <Deliverables />
              </>
            )}
            {view === "scan" && <Scanner demoMode={demoMode} onSaved={refreshPlants} />}
            {view === "plants" && (
              <HistoryView
                plants={plants}
                loading={loadingPlants}
                onOpenPlant={openPlant}
                onDeleteRequest={requestDelete}
                deleteTarget={deleteTarget}
                onConfirmDelete={() => void confirmDelete()}
                onCancelDelete={() => setDeleteTarget(null)}
                setView={changeView}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer is a desktop/tablet element; the mobile app shell uses the
          Android-style bottom navigation instead. */}
      <div className="hidden md:block">
        <Footer />
      </div>

      <BottomNav view={view} setView={changeView} />
      <PwaRegister />

      <PlantDetailDialog
        plant={selectedPlant}
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open);
          if (!open) setSelectedPlant(null);
        }}
        onDelete={requestDelete}
      />
    </div>
  );
}

export function PlantCareApp() {
  return (
    <I18nProvider>
      <PlantCareShell />
    </I18nProvider>
  );
}
