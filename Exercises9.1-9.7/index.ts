import express from 'express';
import calculateBmi from './bmiCalculator';
import bodyParser from 'body-parser';
import calculateExercises from "./exerciseCalculator";
import { Request, Response } from 'express';

const app = express();
app.use(bodyParser.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req: Request, res: Response) => {
  try {
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
      return res.status(400).json({ error: 'parameters missing' });
    }

    if (!Array.isArray(daily_exercises) || !daily_exercises.every(Number.isFinite)) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }

    const dailyHours: number[] = daily_exercises;
    const targetHours: number = target;

    const result = calculateExercises(dailyHours, targetHours);

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});


app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const heightCM = Number(height);
  const weightKG = Number(weight);
  const bmiResult = calculateBmi({ heightCM, weightKG });

  res.json({
    weight: weightKG,
    height: heightCM,
    bmi: bmiResult,
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});