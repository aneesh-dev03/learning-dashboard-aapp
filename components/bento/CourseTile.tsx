'use client'

import { motion } from 'framer-motion'
import { Course, ColorScheme } from '@/types'
import DynamicIcon from '@/components/ui/DynamicIcon'
import ProgressBar from '@/components/ui/ProgressBar'

interface CourseTileProps {
  course: Course
  colorScheme: ColorScheme
}

// defining these inline because there's only 3 and a separate file felt overkill
const themes = {
  blue: {
    bg: 'linear-gradient(140deg, #0d1117 0%, #0f1e3a 100%)',
    glow: 'rgba(59,130,246,0.1)',
    glowHover: '0 0 28px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.12)',
    iconBg: 'rgba(59,130,246,0.12)',
    iconColor: '#60a5fa',
  },
  purple: {
    bg: 'linear-gradient(140deg, #0d1117 0%, #19102e 100%)',
    glow: 'rgba(139,92,246,0.1)',
    glowHover: '0 0 28px rgba(139,92,246,0.15), 0 0 0 1px rgba(139,92,246,0.12)',
    iconBg: 'rgba(139,92,246,0.12)',
    iconColor: '#a78bfa',
  },
  cyan: {
    bg: 'linear-gradient(140deg, #0d1117 0%, #091e24 100%)',
    glow: 'rgba(6,182,212,0.1)',
    glowHover: '0 0 28px rgba(6,182,212,0.15), 0 0 0 1px rgba(6,182,212,0.12)',
    iconBg: 'rgba(6,182,212,0.12)',
    iconColor: '#22d3ee',
  },
}

export default function CourseTile({ course, colorScheme }: CourseTileProps) {
  const t = themes[colorScheme]

  return (
    <motion.article
      whileHover={{
        scale: 1.025,
        boxShadow: t.glowHover,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative h-full rounded-2xl overflow-hidden border border-white/[0.07] p-5 flex flex-col justify-between cursor-default"
      style={{ background: t.bg }}
    >
      {/* grain overlay - makes the card feel less flat */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      <div className="relative flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: t.iconBg }}
        >
          <DynamicIcon name={course.icon_name} size={16} color={t.iconColor} />
        </div>
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2" style={{ fontFamily: 'var(--font-sora)' }}>
          {course.title}
        </h3>
      </div>

      <div className="relative flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 text-xs">Progress</span>
          <span className="text-xs font-medium" style={{ color: t.iconColor }}>
            {course.progress}%
          </span>
        </div>
        <ProgressBar value={course.progress} colorScheme={colorScheme} />
      </div>
    </motion.article>
  )
}
