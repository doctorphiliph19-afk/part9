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

  const addDiary = async (entry: NewDiaryEntry) => {
    setError(null)

    try {
      const data = await diaryService.create(entry)
      setEntries((currentEntries) => currentEntries.concat(data))
    } catch (requestError: unknown) {
      if (axios.isAxiosError(requestError)) {
        const backendError = requestError.response?.data?.error
        const message = Array.isArray(backendError)
          ? backendError
              .map((issue: { message?: string }) => issue.message)
              .filter(Boolean)
              .join(', ')
          : typeof backendError === 'string'
            ? backendError
            : requestError.message

        setError(message)
        return
      }

      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unknown error occurred'
      )
    }
  }

  return (
    <div>
      <h1>Flight Diaries</h1>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <DiaryForm onSubmit={addDiary} />
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <DiaryEntry key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export default App
