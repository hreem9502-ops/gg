"use client";

import { useI18n } from "./i18n-provider";
import { PlantCard } from "./plant-card";
import type { PlantSummary, View } from "./types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Sprout, ScanSearch, Leaf, Loader2 } from "lucide-react";

interface HistoryViewProps {
  plants: PlantSummary[];
  loading: boolean;
  onOpenPlant: (plant: PlantSummary) => void;
  onDeleteRequest: (plant: PlantSummary) => void;
  deleteTarget: PlantSummary | null;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  setView: (v: View) => void;
}

export function HistoryView({
  plants,
  loading,
  onOpenPlant,
  onDeleteRequest,
  deleteTarget,
  onConfirmDelete,
  onCancelDelete,
  setView,
}: HistoryViewProps) {
  const { t } = useI18n();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("history.title")}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            {t("history.desc")}
          </p>
        </div>
        <Button className="gap-1.5 rounded-full" onClick={() => setView("scan")}>
          <ScanSearch className="h-4 w-4" />
          {t("plantsSection.new")}
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex h-72 items-center justify-center rounded-2xl border bg-card">
              <Loader2 className="h-6 w-6 animate-spin text-primary/50" />
            </div>
          ))}
        </div>
      ) : plants.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-primary/25 bg-card px-6 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sprout className="h-8 w-8" />
          </span>
          <div className="max-w-sm space-y-1.5">
            <h3 className="font-display text-xl font-semibold">{t("plants.count.none")}</h3>
            <p className="text-sm text-muted-foreground">{t("recent.empty")}</p>
          </div>
          <Button className="rounded-full" onClick={() => setView("scan")}>
            {t("plantsSection.new")}
          </Button>
        </div>
      ) : (
        <div className="max-h-[68vh] overflow-y-auto scrollbar-organic pe-2">
          <div className="grid gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3">
            {plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} onOpen={onOpenPlant} />
            ))}
          </div>
        </div>
      )}

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && onCancelDelete()}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">{t("history.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("history.deleteDesc")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">{t("history.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={onConfirmDelete}
            >
              {t("history.deleteConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Leaf className="h-3.5 w-3.5" />
        {t("plants.countOfAnalyses")}: {plants.length}
      </div>
    </section>
  );
}
