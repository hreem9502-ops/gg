"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "./i18n-provider";
import { AnalysisResult } from "./analysis-result";
import { CameraDialog } from "./camera-dialog";
import { LeafSpinner } from "./leaf-spinner";
import { deriveHealthStatus, type PlantAnalysisResult } from "./types";
import { processImage, validateFile, type ProcessedImage } from "@/lib/image-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  UploadCloud,
  Camera,
  Trash2,
  RefreshCw,
  ScanSearch,
  Leaf,
  CircleAlert,
} from "lucide-react";

type Status = "idle" | "preview" | "analyzing" | "done";

interface ScannerProps {
  demoMode: boolean;
  onSaved: () => void;
}

export function Scanner({ demoMode, onSaved }: ScannerProps) {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [image, setImage] = useState<ProcessedImage | null>(null);
  const [result, setResult] = useState<PlantAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const steps = [t("scan.analyzing1"), t("scan.analyzing2"), t("scan.analyzing3"), t("scan.analyzing4")];

  // Rotate loading steps while analyzing
  useEffect(() => {
    if (status !== "analyzing") return;
    setStepIndex(0);
    const id = setInterval(() => setStepIndex((i) => Math.min(i + 1, steps.length - 1)), 3500);
    return () => clearInterval(id);
  }, [status]);

  const acceptImage = useCallback(
    async (source: File | string) => {
      setError(null);
      setResult(null);
      setSaved(false);
      try {
        if (typeof source === "string") {
          const processed = await processImage(source);
          setImage(processed);
          setStatus("preview");
          return;
        }
        const validation = validateFile(source);
        if (!validation.ok) {
          toast.error(validation.error === "invalidType" ? t("errors.invalidType") : t("errors.tooLarge"));
          return;
        }
        const processed = await processImage(source);
        setImage(processed);
        setStatus("preview");
      } catch (err) {
        toast.error((err as Error).message || t("errors.server"));
      }
    },
    [t]
  );

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void acceptImage(file);
  }

  function removeImage() {
    setImage(null);
    setResult(null);
    setError(null);
    setSaved(false);
    setStatus("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function analyze() {
    if (!image) {
      toast.error(t("errors.noFile"));
      return;
    }
    setStatus("analyzing");
    setError(null);
    setResult(null);
    setSaved(false);

    try {
      const form = new FormData();
      form.append("image", image.blob, "scan.jpg");
      if (demoMode) form.append("demo", "true");

      const res = await fetch("/api/analyze", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || t("errors.server"));
      }
      setResult(data.result as PlantAnalysisResult);
      setStatus("done");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    } catch (err) {
      setStatus("preview");
      setError((err as Error).message || t("errors.server"));
    }
  }

  async function saveRecord() {
    if (!result || !image || saved) return;
    setSaving(true);
    try {
      const res = await fetch("/api/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commonName: result.plant.commonName,
          scientificName: result.plant.scientificName,
          category: result.plant.category,
          description: result.plant.description,
          isPlant: result.isPlant,
          healthStatus: deriveHealthStatus(result),
          confidence: result.plant.confidence,
          source: result.source,
          imageUrl: image.previewDataUrl,
          thumbUrl: image.thumbDataUrl,
          analysisJson: JSON.stringify(result),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || t("toast.saveFailed"));
      setSaved(true);
      toast.success(t("toast.saved"));
      onSaved();
    } catch (err) {
      toast.error((err as Error).message || t("toast.saveFailed"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("scan.title")}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
          {t("scan.desc")}
        </p>
      </div>

      {/* Dropzone / preview */}
      {status !== "analyzing" && (
        <Card
          className={`rounded-3xl border-2 border-dashed transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-primary/25 bg-card"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
        >
          <CardContent className="p-5 sm:p-8">
            {!image ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UploadCloud className="h-8 w-8" />
                </span>
                <p className="text-sm text-muted-foreground">
                  {t("scan.dropzone")}{" "}
                  <button
                    type="button"
                    className="font-semibold text-primary underline underline-offset-4 hover:opacity-80"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {t("scan.browse")}
                  </button>
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="h-px w-8 bg-border" />
                  {t("scan.or")}
                  <span className="h-px w-8 bg-border" />
                </div>
                <Button
                  variant="outline"
                  className="gap-2 rounded-full"
                  onClick={() => setCameraOpen(true)}
                >
                  <Camera className="h-4 w-4" />
                  {t("scan.takePhoto")}
                </Button>
                <p className="text-xs text-muted-foreground/80">{t("scan.formats")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border shadow-md">
                  <img
                    src={image.previewDataUrl}
                    alt="Selected plant photo preview"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 rounded-full"
                    onClick={removeImage}
                  >
                    <Trash2 className="h-4 w-4" />
                    {t("scan.remove")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 rounded-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <RefreshCw className="h-4 w-4" />
                    {t("scan.replace")}
                  </Button>
                  <Button
                    className="gap-1.5 rounded-full px-6"
                    onClick={() => void analyze()}
                  >
                    <ScanSearch className="h-4 w-4" />
                    {t("scan.analyze")}
                  </Button>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              aria-label={t("hero.upload")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void acceptImage(file);
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive dark:text-red-300"
            role="alert"
          >
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="flex-1">{error}</div>
            <Button size="sm" variant="outline" className="rounded-full" onClick={() => void analyze()}>
              {t("errors.tryAgain")}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading state */}
      <AnimatePresence>
        {status === "analyzing" && image && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Card className="mt-6 rounded-3xl">
              <CardContent className="flex flex-col items-center gap-5 p-8">
                <LeafSpinner size={56} />
                <div className="text-center">
                  <p className="font-display text-lg font-semibold">{t("scan.analyzing")}</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={stepIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-1 text-sm text-muted-foreground"
                    >
                      {steps[stepIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border opacity-80">
                  <img
                    src={image.previewDataUrl}
                    alt="Plant photo being analyzed"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/10 backdrop-grayscale" />
                  <motion.div
                    className="absolute inset-x-0 h-0.5 bg-primary"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <Progress value={undefined} className="h-1.5 w-64" aria-hidden="true" />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {status === "done" && result && (
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="mb-4 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-semibold">{t("scan.resultFor")}</h2>
            </div>
            <AnalysisResult
              result={result}
              mode="new"
              saved={saved}
              saving={saving}
              onSave={() => void saveRecord()}
              onNewScan={removeImage}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <CameraDialog
        open={cameraOpen}
        onOpenChange={setCameraOpen}
        onCapture={(dataUrl) => void acceptImage(dataUrl)}
      />
    </section>
  );
}
