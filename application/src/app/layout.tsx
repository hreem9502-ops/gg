import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const displayFont = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bodyFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const arabicFont = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "PlantCare AI — مساعد ذكي للتعرف على النباتات واكتشاف أمراضها ودليل العناية",
    template: "%s · PlantCare AI",
  },
  description:
    "صوّر أي نبات ودع الذكاء الاصطناعي يتعرف على نوعه، يفحص صحة أوراقه ويكشف أعراض الأمراض الظاهرة، ثم يقدم لك دليلاً كاملاً للعناية — الري، الضوء، التربة والمزيد. مشروع أكاديمي لـ جوري محي الدين، ديما سامي، رونا شريف، سديم الثقفي ووردة البرقي.",
  keywords: [
    "PlantCare AI",
    "التعرف على النباتات",
    "أمراض النباتات",
    "الذكاء الاصطناعي",
    "العناية بالنباتات",
    "plant identification",
    "plant disease detection",
    "AI plant care",
  ],
  applicationName: "PlantCare AI",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PlantCare AI",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2E6B4F" },
    { media: "(prefers-color-scheme: dark)", color: "#1E4A36" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${arabicFont.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
