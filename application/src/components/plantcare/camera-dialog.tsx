"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useI18n } from "./i18n-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw, X, CameraOff } from "lucide-react";

interface CameraDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture: (dataUrl: string) => void;
}

/** Camera capture dialog using the browser media devices API. */
export function CameraDialog({ open, onOpenChange, onCapture }: CameraDialogProps) {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facing, setFacing] = useState<"environment" | "user">("environment");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    async function start() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error("unavailable");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing, width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => undefined);
        }
        setReady(true);
      } catch (err) {
        const name = (err as Error).name;
        if (name === "NotAllowedError" || name === "SecurityError") {
          toast.error(t("errors.cameraDenied"));
        } else {
          toast.error(t("errors.cameraUnavailable"));
        }
        onOpenChange(false);
      }
    }

    start();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setReady(false);
    };
  }, [open, facing]);

  function capture() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // mirror user-facing captures back to natural orientation
    if (facing === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    onCapture(dataUrl);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl overflow-hidden p-0 gap-0">
        <DialogHeader className="p-4 pb-2 pt-4">
          <DialogTitle className="flex items-center gap-2 font-display text-lg">
            <Camera className="h-5 w-5 text-primary" />
            {t("camera.title")}
          </DialogTitle>
          <DialogDescription className="sr-only">{t("camera.title")}</DialogDescription>
        </DialogHeader>

        <div className="relative aspect-[4/3] w-full bg-black">
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="h-full w-full object-cover"
            aria-label="Camera preview"
          />
          {!ready && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/80">
              <CameraOff className="h-8 w-8" />
              <span className="text-xs">…</span>
            </div>
          )}
          {/* botanical framing corners */}
          <div className="pointer-events-none absolute inset-4">
            <div className="absolute start-0 top-0 h-8 w-8 rounded-tl-xl border-s-2 border-t-2 border-primary/70" />
            <div className="absolute end-0 top-0 h-8 w-8 rounded-tr-xl border-e-2 border-t-2 border-primary/70" />
            <div className="absolute bottom-0 start-0 h-8 w-8 rounded-bl-xl border-b-2 border-s-2 border-primary/70" />
            <div className="absolute bottom-0 end-0 h-8 w-8 rounded-br-xl border-b-2 border-e-2 border-primary/70" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 p-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 rounded-full"
            onClick={() => setFacing((f) => (f === "environment" ? "user" : "environment"))}
          >
            <RefreshCw className="h-4 w-4" />
            {t("camera.switch")}
          </Button>
          <Button className="gap-1.5 rounded-full px-6" onClick={capture} disabled={!ready}>
            <Camera className="h-4 w-4" />
            {t("camera.capture")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            {t("camera.close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
