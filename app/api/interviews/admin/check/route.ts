import { NextRequest, NextResponse } from "next/server";
import {
  checkInterviewPanelFromRequest,
  getInterviewPanelRoleIds,
} from "@/lib/discord-staff";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const check = await checkInterviewPanelFromRequest(request);
  if (!check.user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  return NextResponse.json({
    isAdmin: check.isAdmin,
    reason: check.reason,
    needsReauth: check.needsReauth,
    checkedRoleIds: getInterviewPanelRoleIds(),
  });
}
