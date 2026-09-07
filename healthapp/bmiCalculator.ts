interface BmiResult {
  weight: number
  height: number
  bmi: string
}

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)

  if (bmi < 18.5) {
    return 'Underweight range'
  } else if (bmi < 25) {
    return 'Normal range'
  } else if (bmi < 30) {
    return 'Overweight range'
  } else {
    return 'Obese range'
  }
}

const parseArguments = (args: string[]): BmiResult => {
  if (args.length < 4) {
    throw new Error('malformatted parameters')
  }

  const height = Number(args[2])
  const weight = Number(args[3])

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('malformatted parameters')
  }

  return {
    height,
    weight,
    bmi: calculateBmi(height, weight)
  }
}

if (process.argv[1] === import.meta.filename) {
  try {
    console.log(parseArguments(process.argv))
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
