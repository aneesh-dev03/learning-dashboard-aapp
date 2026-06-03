// renders a lucide icon from a string name
// needed because icon_name comes from the db as a string
// typescript hates this but i haven't found a cleaner way to do it

import * as icons from 'lucide-react'
import { LucideProps } from 'lucide-react'

interface DynamicIconProps extends LucideProps {
  name: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconMap = Record<string, any>

export default function DynamicIcon({ name, ...rest }: DynamicIconProps) {
  const Icon = (icons as IconMap)[name]

  if (!Icon) {
    console.warn(`DynamicIcon: icon "${name}" not found, using fallback`)
    return <icons.BookOpen {...rest} />
  }

  return <Icon {...rest} />
}
