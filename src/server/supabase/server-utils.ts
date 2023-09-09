import type { Database } from "@/types/supabase";
import { cookies } from "next/headers";

import {
  createMiddlewareClient,
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";

import type { NextRequest, NextResponse } from "next/server";

export function getCustomRouteHandlerClient() {
  return createRouteHandlerClient<Database>({ cookies });
}

export function getCustomMiddlewareClient(req: NextRequest, res: NextResponse) {
  return createMiddlewareClient<Database>({ req, res });
}

export function getCustomServerComponentClient() {
  return createServerComponentClient<Database>({ cookies });
}
