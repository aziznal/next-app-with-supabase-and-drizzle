import { NextRequest, NextResponse } from "next/server";
import { getCustomRouteHandlerClient } from "@/server/supabase/server-utils";

export async function POST(req: NextRequest, res: NextResponse) {
  const supabase = getCustomRouteHandlerClient();

  return NextResponse.json({
    message: "Login endpoint",
  });
}
