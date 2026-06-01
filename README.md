# Learnspace — Learning Dashboard

built with Next.js 14 (app router), Supabase, Framer Motion, Tailwind CSS

## getting started

```bash
npm install
cp .env.example .env.local
# fill in your supabase keys in .env.local
npm run dev
```

## supabase setup

run the SQL in `supabase-setup.sql` in your project's SQL editor. creates the `courses` table and seeds it with 4 rows.

table schema:
- `id` - uuid pk
- `title` - text
- `progress` - int (0-100)
- `icon_name` - text, must match a Lucide icon component name
- `created_at` - timestamp

## how the server/client split works

`app/page.tsx` is a server component — no `"use client"` at the top. it fetches from supabase using `@supabase/ssr`'s `createServerClient` which reads from `next/headers`. this means the db fetch happens on the server and the keys never touch the client bundle.

the data gets passed as props to `BentoGrid`, which IS a client component (needs framer motion). all the bento tiles are client components too for the same reason.

i tried making CourseTile a server component at first but you can't use `motion.div` in server components so that didn't work. ended up keeping the server/client boundary right at the page level.

## animation notes

- staggered entrance: `staggerChildren: 0.08` on the grid container, tiles fade in + slide up with spring physics
- hover: `whileHover={{ scale: 1.025 }}` + spring transition on each card
- sidebar active indicator uses `layoutId="activeNav"` so it slides between items automatically (framer handles the animation)
- progress bars animate from 0 to the db value on mount with a slight delay so it's visible

## what i'd add with more time

- actual auth (supabase has good docs for this with next.js)
- realtime progress updates using supabase subscriptions
- proper user data instead of hardcoded "Arjun Kumar"
- course detail page
- more than 3 courses showing in the grid (right now it just ignores courses[3+] on desktop)

## env vars needed

see `.env.example`
