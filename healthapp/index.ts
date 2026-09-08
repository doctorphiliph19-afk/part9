import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(height) ||
    isNaN(weight)
  ) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
    return;
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as {
    daily_exercises?: unknown;
    target?: unknown;
  };

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({
      error: 'parameters missing',
    });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some(
      (exercise: unknown) =>
        typeof exercise !== 'number' || isNaN(exercise)
    ) ||
    typeof target !== 'number' ||
    isNaN(target)
  ) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
    return;
  }

  const result = calculateExercises(
    daily_exercises as number[],
    target
  );

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
