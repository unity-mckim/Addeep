import { createClient } from "@supabase/supabase-js";
import { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } from "./env";

if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
}


export const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
);