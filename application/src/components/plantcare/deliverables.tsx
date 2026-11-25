"use client";

import { useI18n } from "./i18n-provider";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileArchive,
  Presentation,
  FileText,
  BookOpenText,
  Download,
  MessageSquareText,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";

interface DeliverableItem {
  href: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  primary?: boolean;
}

export function Deliverables() {
  const { t } = useI18n();

  const items: DeliverableItem[] = [
    {
      href: "/downloads/PlantCare_AI_Complete_Project.zip",
      icon: FileArchive,
      title: t("deliv.zip"),
      desc: t("deliv.zipDesc"),
      primary: true,
    },
    {
      href: "/downloads/PlantCare_AI_Presentation.pptx",
      icon: Presentation,
      title: t("deliv.pptx"),
      desc: t("deliv.pptxDesc"),
    },
    {
      href: "/downloads/PlantCare_AI_Presentation.pdf",
      icon: FileText,
      title: t("deliv.pdf"),
      desc: t("deliv.pdfDesc"),
    },
    {
      href: "/downloads/Project_Report.docx",
      icon: BookOpenText,
      title: t("deliv.report"),
      desc: t("deliv.reportDesc"),
    },
    {
      href: "/downloads/Installation_Guide.docx",
      icon: FileText,
      title: t("deliv.guide"),
      desc: t("deliv.guideDesc"),
    },
    {
      href: "/downloads/Presentation_Speaker_Notes.docx",
      icon: MessageSquareText,
      title: t("deliv.notes"),
      desc: t("deliv.notesDesc"),
    },
    {
      href: "/downloads/Student_Task_Distribution.docx",
      icon: Users,
      title: t("deliv.distribution"),
      desc: t("deliv.distributionDesc"),
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 pb-16 sm:px-6" id="deliverables">
      <div className="mb-6 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight">{t("deliv.title")}</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t("deliv.desc")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.a
            key={item.href}
            href={item.href}
            download
            tabIndex={0}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
            aria-label={`${item.title} - ${t("deliv.download")}`}
          >
            <Card
              className={`h-full rounded-2xl border-border/80 bg-card transition-all group-hover:-translate-y-1 group-hover:shadow-lg ${
                item.primary ? "border-primary/30 shadow-md shadow-primary/10" : ""
              }`}
            >
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      item.primary
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary">
                    <Download className="h-3.5 w-3.5" />
                    {t("deliv.download")}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
