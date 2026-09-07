export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExercises: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyExercises.length;

  const trainingDays = dailyExercises.filter(
    (exercise) => exercise > 0
  ).length;

  const total = dailyExercises.reduce(
    (sum, exercise) => sum + exercise,
    0
  );

  const average = total / periodLength;

  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'good';
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
