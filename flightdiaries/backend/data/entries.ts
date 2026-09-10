import type { DiaryEntry } from "../src/types.ts";

const diaryEntries: DiaryEntry[] = [
  {
    "id": 1,
    "date": "2017-01-01",
    "weather": "rainy",
    "visibility": "poor",
    "flightDuration": 2,
    "flightType": "training",
    "comment": "Pretty scary flight, I'm glad I'm alive"
  },
  {
    "id": 2,
    "date": "2017-04-01",
    "weather": "sunny",
    "visibility": "good",
    "flightDuration": 3,
    "flightType": "sightseeing",
    "comment": "Everything went better than expected, I'm learning much"
  },
  {
    "id": 3,
    "date": "2017-04-15",
    "weather": "windy",
    "visibility": "good",
    "flightDuration": 4,
    "flightType": "training",
    "comment": "I'm getting pretty confident although I hit a flock of birds"
  },
  {
    "id": 4,
    "date": "2017-05-11",
    "weather": "cloudy",
    "visibility": "good",
    "flightDuration": 2,
    "flightType": "transport",
    "comment": "I almost failed the landing but I survived"
  }
];

export default diaryEntries;
