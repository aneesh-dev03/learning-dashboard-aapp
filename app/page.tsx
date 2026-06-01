// main dashboard - server component so we can fetch directly without exposing keys
// don't add "use client" here, it'll break the supabase server client

import { createClient } from '@/lib/supabase/server'
import { Course } from '@/types'
import Sidebar from '@/components/sidebar/Sidebar'
import BentoGrid from '@/components/bento/BentoGrid'

async function getCourses(): Promise<Course[] | null> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      // not throwing here, just returning null and letting the UI handle it
      console.error('error fetching courses:', error.message)
      return null
    }

    // console.log('fetched courses:', data) // debug - remove before submitting lol
    return data as Course[]

  } catch (err) {
    console.error('something went wrong:', err)
    return null
  }
}

export default async function DashboardPage() {
  const courses = await getCourses()

  // would be nice to also fetch user data here but keeping it simple for now
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto p-5 lg:p-6">
        <BentoGrid courses={courses} />
      </main>
    </div>
  )
}
