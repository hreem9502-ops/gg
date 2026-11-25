import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * GET /api/plants/[id] - full saved record (details view).
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const scan = await db.plantScan.findUnique({ where: { id } });
    if (!scan) {
      return NextResponse.json({ ok: false, error: "Plant record not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, plant: scan });
  } catch (err) {
    console.error("[plants] detail failed:", (err as Error).message);
    return NextResponse.json({ ok: false, error: "Could not load the plant record." }, { status: 500 });
  }
}

/**
 * DELETE /api/plants/[id] - remove a saved record.
 */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const existing = await db.plantScan.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      return NextResponse.json({ ok: false, error: "Plant record not found." }, { status: 404 });
    }
    await db.plantScan.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[plants] delete failed:", (err as Error).message);
    return NextResponse.json({ ok: false, error: "Could not delete the plant record." }, { status: 500 });
  }
}
