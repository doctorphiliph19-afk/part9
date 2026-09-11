import type { DiaryEntry as DiaryEntryType } from '../types'

interface Props {
  entry: DiaryEntryType
}

const DiaryEntry = ({ entry }: Props) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>
        visibility: {entry.visibility}
      </p>
      <p>
        weather: {entry.weather}
      </p>
      {entry.comment && <p>comment: {entry.comment}</p>}
    </div>
  )
}

export default DiaryEntry
