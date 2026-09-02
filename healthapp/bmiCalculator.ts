import { parseNumberArgument } from "./utils.js";

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

try {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    throw new Error('Please provide height and weight as arguments');
  }
  
  const height = parseNumberArgument(args[0]);
  const weight = parseNumberArgument(args[1]);
  
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.error('Error:', (error as Error).message);
  process.exit(1);
}
