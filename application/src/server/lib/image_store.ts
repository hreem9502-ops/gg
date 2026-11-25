/**
 * PlantCare AI - secure upload store.
 * Saves validated images to the local uploads/ folder with
 * randomly generated, sanitized filenames (never user-supplied names).
 */
import { randomBytes } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const ALLOWED_MIME = ["image/jpeg", "image/jpg", "image/png", "image/webp"] as const;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

export function isAllowedMime(mime: string): boolean {
  return (ALLOWED_MIME as readonly string[]).includes(mime);
}

export function getExtForMime(mime: string): string {
  return EXT_BY_MIME[mime] || ".jpg";
}

/**
 * Saves image bytes into uploads/ using a random safe filename.
 * Returns the generated filename.
 */
export async function saveUpload(bytes: Buffer, mime: string): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const fileName = `scan_${Date.now()}_${randomBytes(6).toString("hex")}${getExtForMime(mime)}`;
  await writeFile(path.join(UPLOAD_DIR, fileName), bytes);
  return fileName;
}
