import axios from 'axios'
import { useEffect, useState } from 'react'
import DiaryEntry from './components/DiaryEntry'
import DiaryForm from './components/DiaryForm'
import diaryService from './services/diaryService'
import type { DiaryEntry as DiaryEntryType, NewDiaryEntry } from './types'

const App = () => {
  const [entries, setEntries] = useState<DiaryEntryType[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    diaryService.getAll().then((data) => {
      setEntries(data)
    })
  }, [])

  const addDiary = (entry: NewDiaryEntry) => {
    setError(null)

    diaryService
      .create(entry)
      .then((data) => {
        setEntries((currentEntries) => currentEntries.concat(data))
      })
      .catch((requestError: unknown) => {
        if (axios.isAxiosError(requestError)) {
          const backendError = requestError.response?.data?.error
          const message = Array.isArray(backendError)
            ? backendError.map((issue) => issue.message).join(', ')
            : backendError

          setError(message || requestError.message)
          return
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Unknown error occurred'
        )
      })
  }

  return (
    <div>
      <h1>Flight Diaries</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <DiaryForm onSubmit={addDiary} />
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <DiaryEntry key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export default App
