import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * GET /api/plants - list saved plant scans (metadata + thumbnails only).
 */
export async function GET() {
  try {
    const scans = await db.plantScan.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        commonName: true,
        scientificName: true,
        category: true,
        isPlant: true,
        healthStatus: true,
        confidence: true,
        source: true,
        thumbUrl: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ ok: true, plants: scans });
  } catch (err) {
    console.error("[plants] list failed:", (err as Error).message);
    return NextResponse.json({ ok: false, error: "Could not load saved plants." }, { status: 500 });
  }
}

/**
 * POST /api/plants - save an analysis result into "My Plants" history.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      commonName?: string;
      scientificName?: string;
      category?: string;
      description?: string;
      isPlant?: boolean;
      healthStatus?: string;
      confidence?: number | null;
      source?: string;
      imageUrl?: string;
      thumbUrl?: string;
      analysisJson?: string;
    };

    if (!body.commonName || !body.commonName.trim()) {
      return NextResponse.json(
        { ok: false, error: "A plant name is required to save the record." },
        { status: 400 }
      );
    }

    const scan = await db.plantScan.create({
      data: {
        commonName: body.commonName.trim().slice(0, 120),
        scientificName: (body.scientificName || "").slice(0, 160) || null,
        category: (body.category || "").slice(0, 80) || null,
        description: (body.description || "").slice(0, 800) || null,
        isPlant: body.isPlant !== false,
        healthStatus: (body.healthStatus || "unknown").slice(0, 20),
        confidence:
          typeof body.confidence === "number" && Number.isFinite(body.confidence)
            ? body.confidence
            : null,
        source: (body.source || "demo").slice(0, 20),
        imageUrl: body.imageUrl || null,
        thumbUrl: body.thumbUrl || null,
        analysisJson: body.analysisJson || null,
      },
    });

    return NextResponse.json({ ok: true, plant: { id: scan.id } });
  } catch (err) {
    console.error("[plants] save failed:", (err as Error).message);
    return NextResponse.json(
      { ok: false, error: "Could not save the plant to history." },
      { status: 500 }
    );
  }
}
