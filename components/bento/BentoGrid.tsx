'use client'

import { motion } from 'framer-motion'
import { Course } from '@/types'
import HeroTile from './HeroTile'
import CourseTile from './CourseTile'
import ActivityTile from './ActivityTile'
import ErrorTile from './ErrorTile'

interface BentoGridProps {
  courses: Course[] | null
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    }
  }
}

// exporting this because CourseTile needs it too... or does it? 
// actually no it doesn't anymore but leaving export just in case
export const tileAnim = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 22,
    }
  }
}

// color rotation for course tiles - just cycles through
const colorCycle = ['blue', 'purple', 'cyan'] as const

export default function BentoGrid({ courses }: BentoGridProps) {
  return (
    <>
      {/* === DESKTOP (lg+) === */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="hidden lg:grid gap-4 h-full pb-4"
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'minmax(240px, 1fr) minmax(170px, auto)',
          gridTemplateAreas: `
            "hero hero activity"
            "c1 c2 c3"
          `
        }}
      >
        <motion.div variants={tileAnim} style={{ gridArea: 'hero' }}>
          <HeroTile streak={12} />
        </motion.div>

        <motion.div variants={tileAnim} style={{ gridArea: 'activity' }}>
          <ActivityTile />
        </motion.div>

        {courses === null ? (
          <motion.div variants={tileAnim} style={{ gridArea: 'c1', gridColumn: 'span 3' }}>
            <ErrorTile />
          </motion.div>
        ) : (
          <>
            {courses[0] && (
              <motion.div variants={tileAnim} style={{ gridArea: 'c1' }}>
                <CourseTile course={courses[0]} colorScheme="blue" />
              </motion.div>
            )}
            {courses[1] && (
              <motion.div variants={tileAnim} style={{ gridArea: 'c2' }}>
                <CourseTile course={courses[1]} colorScheme="purple" />
              </motion.div>
            )}
            {courses[2] && (
              <motion.div variants={tileAnim} style={{ gridArea: 'c3' }}>
                <CourseTile course={courses[2]} colorScheme="cyan" />
              </motion.div>
            )}
            {/* if there are more than 3 courses, they just don't show on desktop for now */}
            {/* TODO: add a "view all" link or make the grid dynamic */}
          </>
        )}
      </motion.div>

      {/* === TABLET (md to lg) === */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="hidden md:grid lg:hidden gap-4 pb-4"
        style={{ gridTemplateColumns: '1fr 1fr' }}
      >
        <motion.div variants={tileAnim} className="col-span-2" style={{ minHeight: 200 }}>
          <HeroTile streak={12} />
        </motion.div>
        <motion.div variants={tileAnim} style={{ minHeight: 160 }}>
          <ActivityTile />
        </motion.div>

        {courses === null ? (
          <motion.div variants={tileAnim}>
            <ErrorTile />
          </motion.div>
        ) : courses.slice(0, 3).map((course, i) => (
          <motion.div key={course.id} variants={tileAnim} style={{ minHeight: 160 }}>
            <CourseTile course={course} colorScheme={colorCycle[i % 3]} />
          </motion.div>
        ))}
      </motion.div>

      {/* === MOBILE (< md) === */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex md:hidden flex-col gap-4 pb-24"
      >
        <motion.div variants={tileAnim} style={{ minHeight: 210 }}>
          <HeroTile streak={12} />
        </motion.div>
        <motion.div variants={tileAnim} style={{ minHeight: 150 }}>
          <ActivityTile />
        </motion.div>

        {courses === null
          ? <motion.div variants={tileAnim}><ErrorTile /></motion.div>
          : courses.slice(0, 3).map((course, i) => (
            <motion.div key={course.id} variants={tileAnim} style={{ minHeight: 140 }}>
              <CourseTile course={course} colorScheme={colorCycle[i % 3]} />
            </motion.div>
          ))
        }
      </motion.div>
    </>
  )
}
