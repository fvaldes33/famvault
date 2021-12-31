import { createClient } from '@supabase/supabase-js'

const isServer = typeof window === "undefined";

// declare global {
//   interface Window {
//     ENV: { [key: string]: string };
//   }
// }

function createSupabase(forceClient: boolean = false) {
  if (isServer) {
    //Server environment will use service key
    if (forceClient) {
      return createClient(
        process.env.PUBLIC_SUPABASE_URL || "",
        process.env.PUBLIC_SUPABASE_ANON_KEY || ""
      );
    }

    return createClient(
      process.env.PUBLIC_SUPABASE_URL || "",
      process.env.PRIVATE_SUPABASE_SECRET_KEY || ""
    );
  }

  //Browser environment will use anon key
  return createClient(
    window.ENV.PUBLIC_SUPABASE_URL,
    window.ENV.PUBLIC_SUPABASE_ANON_KEY
  );
}

export const supabase = createSupabase();
export const clientSupabase = createSupabase(true);
