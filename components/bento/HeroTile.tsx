'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

interface HeroTileProps {
  streak: number
}

export default function HeroTile({ streak }: HeroTileProps) {
  // figured time-based greeting is a nice touch
  const h = new Date().getHours()
  const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative h-full rounded-2xl overflow-hidden border border-white/[0.07] p-6 flex flex-col justify-between cursor-default"
      style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 60%, #0d1117 100%)' }}
    >
      {/* bg glows - just decorative */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.08] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-[0.07] blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
      />

      <div className="relative z-10">
        <p className="text-slate-400 text-sm mb-1">{greeting},</p>
        <h1
          className="text-3xl lg:text-4xl font-semibold text-white leading-tight"
          style={{ fontFamily: 'var(--font-sora, sans-serif)' }}
        >
          Arjun Kumar
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xs leading-relaxed">
          You have <span className="text-white font-medium">3 lessons</span> scheduled today.
        </p>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-4 flex-wrap">

        {/* streak counter */}
        <div className="flex items-center gap-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3">
          {/* pulsing the flame icon so it feels alive */}
          <motion.div
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5 }}
          >
            <Flame size={20} className="text-orange-400" />
          </motion.div>
          <div>
            <p
              className="text-white font-semibold text-xl leading-none"
              style={{ fontFamily: 'var(--font-sora)' }}
            >
              {streak}
            </p>
            <p className="text-slate-500 text-xs mt-0.5">day streak</p>
          </div>
        </div>

        {/* weekly progress - kinda squished on small screens but ok */}
        <div className="flex flex-col gap-2 flex-1 min-w-[120px] max-w-[200px]">
          <div className="flex justify-between">
            <span className="text-slate-400 text-xs">Weekly goal</span>
            <span className="text-slate-300 text-xs font-medium">68%</span>
          </div>
          <div className="progress-track">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '68%' }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
            />
          </div>
          <p className="text-slate-600 text-[11px]">17 / 25 hrs this week</p>
        </div>

      </div>
    </motion.article>
  )
}
