import type { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function getCustomClientComponentClient() {
  return createClientComponentClient<Database>();
}
