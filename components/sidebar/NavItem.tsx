'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface Props {
  item: {
    id: string
    label: string
    icon: LucideIcon
    href: string
  }
  isActive: boolean
  collapsed: boolean
  onClick: () => void
}

// the layoutId trick here is the coolest part imo - makes the highlight
// slide smoothly between items without any manual animation code
export default function NavItem({ item, isActive, collapsed, onClick }: Props) {
  const Icon = item.icon

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left
        ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
        transition-colors duration-150`}
    >
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)'
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        />
      )}

      <Icon size={17} className="relative shrink-0" />

      {!collapsed && (
        <span className="relative text-sm font-medium whitespace-nowrap">{item.label}</span>
      )}

      {/* little side indicator when collapsed */}
      {isActive && collapsed && (
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-blue-500" />
      )}
    </button>
  )
}
