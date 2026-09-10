import { useState } from 'react'
import type { NewDiaryEntry } from '../types'

interface Props {
  onSubmit: (entry: NewDiaryEntry) => void
}

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [flightDuration, setFlightDuration] = useState('')
  const [flightType, setFlightType] = useState('')

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      flightDuration: Number(flightDuration),
      flightType,
    }

    onSubmit(newEntry)

    setDate('')
    setWeather('')
    setVisibility('')
    setFlightDuration('')
    setFlightType('')
  }

  return (
    <div>
      <h2>Add new diary entry</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Weather:
            <select
              value={weather}
              onChange={(event) => setWeather(event.target.value)}
            >
              <option value="">Select weather</option>
              <option value="sunny">Sunny</option>
              <option value="rainy">Rainy</option>
              <option value="cloudy">Cloudy</option>
              <option value="stormy">Stormy</option>
              <option value="windy">Windy</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Visibility:
            <select
              value={visibility}
              onChange={(event) => setVisibility(event.target.value)}
            >
              <option value="">Select visibility</option>
              <option value="great">Great</option>
              <option value="good">Good</option>
              <option value="ok">OK</option>
              <option value="poor">Poor</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Flight duration:
            <input
              type="number"
              value={flightDuration}
              onChange={(event) => setFlightDuration(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Flight type:
            <select
              value={flightType}
              onChange={(event) => setFlightType(event.target.value)}
            >
              <option value="">Select flight type</option>
              <option value="sightseeing">Sightseeing</option>
              <option value="transport">Transport</option>
              <option value="training">Training</option>
            </select>
          </label>
        </div>
        <button type="submit">Add diary entry</button>
      </form>
    </div>
  )
}

export default DiaryForm
