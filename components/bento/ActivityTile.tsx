'use client'

import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { useMemo } from 'react'

function generateMockData() {
  const pattern = [1,3,0,2,4,1,0,3,2,1,4,0,1,2,3,0,4,1,2,0,3,1,0,2,4,1,3,0,2,1,
                   0,4,1,2,3,1,0,2,4,0,1,3,2,0,1,4,0,2,1,3,0,1,2,4,1,0,3,2,1,0,
                   4,1,2,0,3,1,4,2,0,1]
  const result = []
  const today = new Date()

  for (let i = 69; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    result.push({
      date: d.toISOString().split('T')[0],
      count: pattern[69 - i] ?? 0
    })
  }
  return result
}

function cellColor(n: number) {
  if (n === 0) return 'rgba(255,255,255,0.04)'
  if (n === 1) return 'rgba(59,130,246,0.2)'
  if (n === 2) return 'rgba(59,130,246,0.4)'
  if (n === 3) return 'rgba(59,130,246,0.6)'
  return 'rgba(59,130,246,0.85)'
}

export default function ActivityTile() {
  const data = useMemo(() => generateMockData(), [])

  const weeks: typeof data[] = []
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7))
  }

  const activeDays = data.filter(d => d.count > 0).length

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full rounded-2xl border border-white/[0.07] bg-[#0d1117] p-5 flex flex-col gap-3 cursor-default overflow-hidden relative"
    >
      <div
        className="absolute -top-4 -right-4 w-28 h-28 rounded-full opacity-20 blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #10b981, transparent)' }}
      />
      <header className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-emerald-400" />
          <span className="text-sm font-medium text-white">Activity</span>
        </div>
        <span className="text-xs text-slate-500">{activeDays} sessions</span>
      </header>
      <div className="flex gap-[3px] flex-1 items-end relative z-10">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px] flex-1">
            {week.map((day, di) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: wi * 0.025 + di * 0.008 }}
                title={`${day.date} — ${day.count} session${day.count !== 1 ? 's' : ''}`}
                className="rounded-[3px] hover:scale-110 transition-transform cursor-default"
                style={{ backgroundColor: cellColor(day.count), aspectRatio: '1 / 1', minHeight: 7 }}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-600 relative z-10">Last 10 weeks</p>
    </motion.article>
  )
}