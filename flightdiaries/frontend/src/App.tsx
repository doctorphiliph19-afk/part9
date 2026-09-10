import { useEffect, useState } from 'react'
import DiaryEntry from './components/DiaryEntry'
import diaryService from './services/diaryService'
import type { DiaryEntry as DiaryEntryType } from './types'

const App = () => {
  const [entries, setEntries] = useState<DiaryEntryType[]>([])

  useEffect(() => {
    diaryService.getAll().then((data) => {
      setEntries(data)
    })
  }, [])

  return (
    <div>
      <h1>Flight Diaries</h1>
      {entries.map((entry) => (
        <DiaryEntry key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export default App
