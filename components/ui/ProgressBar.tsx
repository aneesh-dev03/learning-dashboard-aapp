'use client'

import { motion } from 'framer-motion'
import { ColorScheme } from '@/types'

interface ProgressBarProps {
  value: number
  colorScheme: ColorScheme
  delay?: number
}

// these gradients match the card themes in CourseTile
// duplicated from there which isn't ideal but w/e
const barGradients: Record<ColorScheme, string> = {
  blue: 'linear-gradient(90deg, #2563eb, #60a5fa)',
  purple: 'linear-gradient(90deg, #7c3aed, #c084fc)',
  cyan: 'linear-gradient(90deg, #0891b2, #22d3ee)',
}

export default function ProgressBar({ value, colorScheme, delay = 0 }: ProgressBarProps) {
  const gradient = barGradients[colorScheme]

  return (
    <div className="progress-track w-full">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{
          delay: delay + 0.35,
          duration: 1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="h-full rounded-full relative"
        style={{ background: gradient }}
      >
        {/* tip glow - subtle but looks nice */}
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full blur-sm opacity-70"
          style={{ background: gradient }}
        />
      </motion.div>
    </div>
  )
}
