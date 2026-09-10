import type { DiaryEntry as DiaryEntryType } from '../types'

interface Props {
  entry: DiaryEntryType
}

const DiaryEntry = ({ entry }: Props) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>
        <strong>Weather:</strong> {entry.weather}
      </p>
      <p>
        <strong>Visibility:</strong> {entry.visibility}
      </p>
    </div>
  )
}

export default DiaryEntry
