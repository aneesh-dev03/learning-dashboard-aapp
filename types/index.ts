// types file - keeping this separate felt cleaner

export interface Course {
  id: string
  title: string
  progress: number
  icon_name: string
  created_at: string
}

// TODO: add user type when i implement auth
// export interface User {
//   id: string
//   name: string
//   email: string
// }

export interface NavItem {
  id: string
  label: string
  icon: string
  href: string
}

export type ColorScheme = 'blue' | 'purple' | 'cyan'

// not sure if i need this but keeping it for now
export interface ActivityDay {
  date: string
  count: number
}
