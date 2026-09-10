export interface DiaryEntry {
  id: number
  date: string
  weather: string
  visibility: string
  flightDuration: number
  flightType: string
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
