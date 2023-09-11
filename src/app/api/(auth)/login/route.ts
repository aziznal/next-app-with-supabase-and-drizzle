import { NextRequest, NextResponse } from "next/server";
import { getCustomRouteHandlerClient } from "@/server/supabase/server-utils";
import { loginSchema } from "../_schemas/login-schema";

import { tryParse } from "@/app/api/_utils/validation";
import { CustomResponse } from "@/app/api/_utils/response.type";
import {
  buildBadRequestError,
  buildNotFoundRequestError,
} from "@/app/api/_utils/errors";
import { publicRouter } from "../../_utils/routers";

export type LoginResponse = CustomResponse<{ message: "success" }>;

const router = publicRouter.post(
  async (req, _ctx, _next): Promise<NextResponse<LoginResponse>> => {
    const { parsed, isError, errorMessage } = tryParse(
      loginSchema,
      await req.json()
    );

    if (isError) {
      return buildBadRequestError(errorMessage);
    }

    const supabase = getCustomRouteHandlerClient();

    const result = await supabase.auth.signInWithPassword({
      email: parsed.email,
      password: parsed.password,
    });

    if (result.error) {
      return buildNotFoundRequestError("Email or password is incorrect");
    }

    // sets session for client as well as server
    await supabase.auth.setSession(result.data.session);

    return NextResponse.json({
      _type: "success",
      data: {
        message: "success",
      },
    });
  }
);

export async function POST(req: NextRequest, res: NextResponse) {
  return router.run(req, res);
}
