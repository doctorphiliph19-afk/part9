import { useState } from 'react'
import type { NewDiaryEntry, Visibility, Weather } from '../types'

interface Props {
  onSubmit: (entry: NewDiaryEntry) => void
}

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility>('good')
  const [weather, setWeather] = useState<Weather>('sunny')
  const [comment, setComment] = useState('')

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newEntry: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    }

    onSubmit(newEntry)

    setDate('')
    setVisibility('good')
    setWeather('sunny')
    setComment('')
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div>
          visibility
          {(['great', 'good', 'ok', 'poor'] as Visibility[]).map((value) => (
            <label key={value}>
              {value}
              <input
                type="radio"
                name="visibility"
                value={value}
                checked={visibility === value}
                onChange={() => setVisibility(value)}
              />
            </label>
          ))}
        </div>

        <div>
          weather
          {(['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as Weather[]).map(
            (value) => (
              <label key={value}>
                {value}
                <input
                  type="radio"
                  name="weather"
                  value={value}
                  checked={weather === value}
                  onChange={() => setWeather(value)}
                />
              </label>
            ),
          )}
        </div>

        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default DiaryForm
