/** Global types */

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
] as const

export type Month = (typeof months)[number]

export type Word = {
  id: string
  mikmaq: string
  english: string
  startMonth: Month
  imagePath: string
  audioPath: string
  createdAt: string
  userId: string
}
