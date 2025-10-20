import {api} from '@/api'

type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

type Word = {
  id: string
  mikmaq: string
  english: string
  startMonth: Month
  imagePath: string
  audioPath: string
  createdAt: string
  userId: string
}

export const wordsLoader = async () => {
  const {data} = await api.get<{words: Word[]}>('/words')
  return {words: data.words}
}
