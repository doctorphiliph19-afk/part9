import { parseNumberArgument } from "./utils.js";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length;

  const trainingDays = dailyExerciseHours.filter(
    hours => hours > 0
  ).length;

  const totalHours = dailyExerciseHours.reduce(
    (sum, hours) => sum + hours,
    0
  );

  const average = totalHours / periodLength;

  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent';
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you should exercise more';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    throw new Error('Please provide target and exercise hours as arguments');
  }
  
  const target = parseNumberArgument(args[0]);
  const dailyExerciseHours: number[] = args.slice(1).map((arg: string) => 
    parseNumberArgument(arg)
  );
  
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error) {
  console.error('Error:', (error as Error).message);
  process.exit(1);
}
