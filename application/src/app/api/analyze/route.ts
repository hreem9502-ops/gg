import { NextRequest, NextResponse } from "next/server";
import { analyzePlantImage } from "@/server/services/ai_service";
import { enrichWithPlantId } from "@/server/services/plant_id_service";
import { isAllowedMime, MAX_UPLOAD_BYTES, saveUpload } from "@/server/lib/image_store";

export const runtime = "nodejs";
export const maxDuration = 120;

/**
 * POST /api/analyze
 * multipart/form-data: { image: File, demo?: "true" }
 *
 * Validates the upload, stores it securely, runs the AI analysis
 * (Gemini -> Vision -> Demo fallback) and returns the structured result.
 */
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const image = form.get("image");
    const forceDemo = form.get("demo") === "true";

    if (!(image instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "No image was provided. Please select a plant photo first." },
        { status: 400 }
      );
    }

    const mime = image.type || "image/jpeg";
    if (!isAllowedMime(mime)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Unsupported file type. Please upload a JPG, JPEG, PNG or WEBP image of a plant.",
        },
        { status: 400 }
      );
    }

    if (image.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Image is too large. Maximum size is 10 MB." },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await image.arrayBuffer());
    if (bytes.length === 0) {
      return NextResponse.json({ ok: false, error: "The uploaded file is empty." }, { status: 400 });
    }

    // Secure server-side storage of the original upload
    let uploadFile = "";
    try {
      uploadFile = await saveUpload(bytes, mime);
    } catch (err) {
      console.error("[analyze] failed to store upload:", (err as Error).message);
    }

    const base64 = bytes.toString("base64");
    const result = await analyzePlantImage({ base64, mime, forceDemo });

    // Optional Plant.id enrichment (only when PLANT_ID_API_KEY is set)
    if (!forceDemo && result.isPlant) {
      const enrichment = await enrichWithPlantId(base64);
      if (enrichment?.matched && enrichment.commonName) {
        result.plant.commonName = enrichment.commonName;
        if (enrichment.scientificName) result.plant.scientificName = enrichment.scientificName;
        if (enrichment.probability != null) result.plant.confidence = enrichment.probability;
      }
    }

    return NextResponse.json({ ok: true, result, uploadFile });
  } catch (err) {
    console.error("[analyze] unexpected error:", (err as Error).message);
    return NextResponse.json(
      {
        ok: false,
        error:
          "The analysis request could not be completed. Please try again in a moment. (" +
          (err as Error).message +
          ")",
      },
      { status: 500 }
    );
  }
}
