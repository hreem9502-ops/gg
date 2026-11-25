/**
 * PlantCare AI - client-side image validation & processing.
 * Validates file type/size, downscales large photos for analysis,
 * and produces small thumbnails for the history grid.
 */

export const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export interface ProcessedImage {
  previewDataUrl: string; // max 1024px JPEG (analysis + record image)
  thumbDataUrl: string; // max 320px JPEG (history thumbnail)
  blob: Blob; // analysis payload
  width: number;
  height: number;
}

export function validateFile(file: File): { ok: boolean; error?: "invalidType" | "tooLarge" } {
  if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) return { ok: false, error: "invalidType" };
  if (file.size > MAX_FILE_BYTES) return { ok: false, error: "tooLarge" };
  return { ok: true };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read the image file."));
    img.src = src;
  });
}

function drawToDataUrl(img: HTMLImageElement, maxDim: number, quality: number): string {
  const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  // white background so transparent PNGs flatten nicely
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", quality);
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, body] = dataUrl.split(",");
  const mime = header.match(/data:(.*?);/)?.[1] || "image/jpeg";
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

/** Processes a File (or data URL from camera capture) into the formats the app needs. */
export async function processImage(source: File | string): Promise<ProcessedImage> {
  const src = typeof source === "string" ? source : URL.createObjectURL(source);
  try {
    const img = await loadImage(src);
    const previewDataUrl = drawToDataUrl(img, 1024, 0.9);
    const thumbDataUrl = drawToDataUrl(img, 320, 0.75);
    return {
      previewDataUrl,
      thumbDataUrl,
      blob: dataUrlToBlob(previewDataUrl),
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
  } finally {
    if (typeof source !== "string") URL.revokeObjectURL(src);
  }
}
