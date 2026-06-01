'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react'
import NavItem from './NavItem'

// probably should move this to a config file but whatever, it works
const navLinks = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { id: 'courses', label: 'My Courses', icon: BookOpen, href: '/courses' },
  { id: 'analytics', label: 'Analytics', icon: BarChart2, href: '/analytics' },
  { id: 'notifications', label: 'Alerts', icon: Bell, href: '/notifications' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeId, setActiveId] = useState('dashboard')

  return (
    <>
      {/* ---- desktop sidebar ---- */}
      <motion.nav
        animate={{ width: collapsed ? 68 : 220 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col h-screen border-r border-white/[0.06] bg-[#0d1117] shrink-0 relative z-10 overflow-hidden"
      >
        {/* logo / brand */}
        <div className="px-4 pt-5 pb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0">
            <Zap size={15} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="font-semibold text-sm text-white whitespace-nowrap"
                style={{ fontFamily: 'var(--font-sora)' }}
              >
                Learnspace
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* nav */}
        <div className="flex-1 px-2 flex flex-col gap-0.5">
          {navLinks.map(item => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              collapsed={collapsed}
              onClick={() => setActiveId(item.id)}
            />
          ))}
        </div>

        {/* user section - hardcoded for now, TODO: pull from auth */}
        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 shrink-0 flex items-center justify-center text-xs font-bold text-white">
              AK
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="flex flex-col min-w-0"
                >
                  <span className="text-xs font-medium text-white truncate">Arjun Kumar</span>
                  <span className="text-[10px] text-slate-500">Pro Plan</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* collapse toggle - the negative right positioning took me forever to get right */}
        <button
          onClick={() => setCollapsed(prev => !prev)}
          className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-[#1e293b] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-20"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.nav>

      {/* ---- mobile bottom nav ---- */}
      {/* TODO: add hamburger menu variant for tablets? */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d1117]/95 backdrop-blur-md border-t border-white/[0.06]">
        <div className="flex items-center justify-around py-2 px-2">
          {navLinks.map(item => {
            const Icon = item.icon
            const active = activeId === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                  active ? 'text-blue-400' : 'text-slate-500'
                }`}
              >
                <Icon size={19} />
                <span className="text-[10px]">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
