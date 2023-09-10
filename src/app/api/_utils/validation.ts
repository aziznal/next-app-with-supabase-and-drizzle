import { z } from "zod";

type TryParseResult<T> =
  | {
      parsed: T;
      isError: false;
      errorMessage?: undefined;
    }
  | {
      parsed?: undefined;
      isError: true;
      errorMessage: string;
    };

/**
 * Attempts to parse the given raw data using the given schema.
 *
 * Returns an error message resultant from the schema validation if the parse fails.
 *
 * Returns the parsed data if the parse succeeds.
 * */
export function tryParse<T>(
  schema: z.ZodSchema<T>,
  raw: any
): TryParseResult<T> {
  try {
    return { parsed: schema.parse(raw), isError: false };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues.map((issue) => issue.message).join(" ");

      return { errorMessage, isError: true };
    } else {
      return { errorMessage: "An unknown error occurred.", isError: true };
    }
  }
}
