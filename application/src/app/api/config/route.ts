import { NextResponse } from "next/server";
import { getProviderStatus } from "@/server/services/ai_service";

export const runtime = "nodejs";

/**
 * GET /api/config - reports which AI provider is active.
 * Only booleans/names are returned; API keys never leave the server.
 */
export async function GET() {
  const status = getProviderStatus();
  return NextResponse.json({ ok: true, ...status });
}
