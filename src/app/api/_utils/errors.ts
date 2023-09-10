import { NextResponse } from "next/server";
import { ErrorResponse } from "./response.type";

export function buildRequestError(
  message: string,
  status: number
): NextResponse<ErrorResponse> {
  return new NextResponse(
    JSON.stringify({
      errorMessage: message,
      _type: "error",
    } satisfies ErrorResponse),
    {
      status: status,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}

export function buildBadRequestError(message?: string) {
  return buildRequestError(message ?? "Bad request", 400);
}

export function buildNotFoundRequestError(message?: string) {
  return buildRequestError(message ?? "Not found", 404);
}
