import { createBrowserClient } from '@supabase/ssr'

// client-side supabase - for use in client components if needed
// currently not used anywhere but keeping it for when i add realtime stuff maybe

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
