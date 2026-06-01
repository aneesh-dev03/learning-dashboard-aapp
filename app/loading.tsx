// this shows while the server component is fetching from supabase
// spent way too long getting this grid to match the actual layout lol

export default function Loading() {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* sidebar placeholder */}
      <div className="w-[220px] border-r border-white/5 bg-[#0d1117] p-4 flex flex-col gap-3 shrink-0">
        <div className="h-8 w-28 rounded-lg bg-white/5 animate-pulse mb-6" />
        {/* nav items */}
        {[1,2,3,4,5].map(i => (
          <div key={i} className="h-10 rounded-xl bg-white/5 animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
        ))}
      </div>

      <main className="flex-1 p-6 overflow-auto">
        {/* tried to match the bento layout as close as possible */}
        <div
          className="grid gap-4 h-full"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'minmax(240px, 1fr) minmax(170px, auto)',
            gridTemplateAreas: '"hero hero activity" "c1 c2 c3"'
          }}
        >
          <div className="rounded-2xl bg-white/[0.04] animate-pulse-slow border border-white/5" style={{ gridArea: 'hero' }} />
          <div className="rounded-2xl bg-white/[0.04] animate-pulse-slow border border-white/5" style={{ gridArea: 'activity', animationDelay: '100ms' }} />
          {(['c1','c2','c3'] as const).map((area, i) => (
            <div
              key={area}
              className="rounded-2xl bg-white/[0.04] animate-pulse-slow border border-white/5"
              style={{ gridArea: area, animationDelay: `${(i+2) * 100}ms` }}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
