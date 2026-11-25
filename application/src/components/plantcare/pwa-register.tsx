"use client";

/**
 * PlantCare AI — PWA glue.
 * - Registers the service worker (installability for Android/iOS).
 * - Captures the browser install prompt and shows a floating install banner.
 * - Detects standalone (installed) mode.
 */
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "./i18n-provider";
import { LeafLogo } from "./leaf-logo";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const BANNER_DISMISS_KEY = "plantcare_install_dismissed";

export function PwaRegister() {
  const { t } = useI18n();
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [standalone, setStandalone] = useState(false);

  // Register the service worker once.
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    };
    if (document.readyState === "complete") onLoad();
    else {
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  // Track installed/standalone state.
  useEffect(() => {
    const mq = window.matchMedia("(display-mode: standalone)");
    const sync = () => setStandalone(mq.matches || (window.navigator as { standalone?: boolean }).standalone === true);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  // Capture the install prompt.
  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      try {
        if (window.localStorage.getItem(BANNER_DISMISS_KEY) === "1") return;
      } catch {
        /* ignore */
      }
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const install = useCallback(async () => {
    if (!installEvent) return;
    try {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      if (choice.outcome === "accepted") {
        toast.success(t("pwa.installed"));
      }
    } catch {
      /* user closed the native dialog */
    } finally {
      setInstallEvent(null);
      setVisible(false);
    }
  }, [installEvent, t]);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      window.localStorage.setItem(BANNER_DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  // Listen for successful installs to hide the banner.
  useEffect(() => {
    const onInstalled = () => {
      setInstallEvent(null);
      setVisible(false);
      toast.success(t("pwa.installed"));
    };
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, [t]);

  return (
    <AnimatePresence>
      {visible && installEvent && !standalone && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-3 bottom-[calc(72px+env(safe-area-inset-bottom))] z-50 sm:inset-x-auto sm:bottom-4 sm:end-4 sm:max-w-sm"
          role="dialog"
          aria-label={t("pwa.installTitle")}
        >
          <div className="rounded-2xl border border-border/80 bg-card/95 p-4 shadow-lg backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <LeafLogo className="h-7 w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug">{t("pwa.installTitle")}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {t("pwa.installHint")}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="-me-1 -mt-1 h-7 w-7 shrink-0 rounded-full"
                onClick={dismiss}
                aria-label={t("pwa.later")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 flex gap-2">
              <Button
                className="h-9 flex-1 gap-1.5 rounded-full"
                onClick={() => void install()}
              >
                <Download className="h-4 w-4" />
                {t("pwa.install")}
              </Button>
              <Button variant="outline" className="h-9 rounded-full px-4" onClick={dismiss}>
                {t("pwa.later")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
