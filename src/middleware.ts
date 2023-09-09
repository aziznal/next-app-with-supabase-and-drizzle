import { NextResponse, NextRequest } from "next/server";
import { getCustomMiddlewareClient } from "./server/supabase/server-utils";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = getCustomMiddlewareClient(req, res);

  const session = await supabase.auth.getSession();

  console.log(session);

  return NextResponse.next();
}

export const config = {
  // match every single path other than whatever weird stuff next.js uses
  matcher: "/",
};
