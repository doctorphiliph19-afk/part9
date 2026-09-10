import { useEffect, useState } from 'react'
import DiaryEntry from './components/DiaryEntry'
import DiaryForm from './components/DiaryForm'
import diaryService from './services/diaryService'
import type { DiaryEntry as DiaryEntryType, NewDiaryEntry } from './types'

const App = () => {
  const [entries, setEntries] = useState<DiaryEntryType[]>([])

  useEffect(() => {
    diaryService.getAll().then((data) => {
      setEntries(data)
    })
  }, [])

  const addDiary = (entry: NewDiaryEntry) => {
    diaryService.create(entry).then((data) => {
      setEntries((currentEntries) => currentEntries.concat(data))
    })
  }

  return (
    <div>
      <h1>Flight Diaries</h1>
      <DiaryForm onSubmit={addDiary} />
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <DiaryEntry key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export default App
