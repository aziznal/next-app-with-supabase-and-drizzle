import { NextRequest, NextResponse } from "next/server";
import { getCustomRouteHandlerClient } from "@/server/supabase/server-utils";
import { tryParse } from "../../_utils/validation";
import { registerSchema } from "../_schemas/register-schema";
import { buildBadRequestError, buildRequestError } from "../../_utils/errors";
import { CustomResponse } from "../../_utils/response.type";
import { publicRouter } from "../../_utils/routers";

export type RegisterResponse = CustomResponse<{
  message: string;
}>;

const router = publicRouter.post(
  async (req, ctx, next): Promise<NextResponse<RegisterResponse>> => {
    const { parsed, isError, errorMessage } = tryParse(
      registerSchema,
      await req.json()
    );

    if (isError) {
      return buildBadRequestError(errorMessage);
    }

    const supabase = getCustomRouteHandlerClient();

    const result = await supabase.auth.signUp({
      email: parsed.email,
      password: parsed.password,
    });

    if (result.error || !result.data.session) {
      return buildRequestError(
        result.error?.message ?? "Something went wrong",
        400
      );
    }

    await supabase.auth.setSession(result.data.session);

    console.log(await supabase.auth.getSession());

    return NextResponse.json({
      _type: "success",
      data: {
        message: "User created successfully",
      },
    });
  }
);

export async function POST(req: NextRequest, res: NextResponse) {
  return router.run(req, res);
}
