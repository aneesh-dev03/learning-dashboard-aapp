import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// only use this in server components / route handlers
// for client components use lib/supabase/client.ts

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // not implementing set/remove since we don't have auth yet
        // will need these when adding login
      },
    }
  )
}
