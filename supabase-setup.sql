-- run this in your Supabase SQL editor

-- create the courses table
create table if not exists courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name text not null default 'BookOpen',
  created_at timestamptz default now()
);

-- seed data - icon names must match Lucide icon component names exactly
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code'),
  ('System Design Fundamentals', 40, 'Server'),
  ('TypeScript Mastery', 90, 'FileCode'),
  ('CSS Architecture', 55, 'Layout');

-- optional: make it public (if you're not using auth)
-- alter table courses enable row level security;
-- create policy "allow public read" on courses for select using (true);
