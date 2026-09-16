import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';
import { HOST, PORT, getApiBaseUrl } from './server';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({
    message: 'Octofit Tracker API',
    apiUrl: getApiBaseUrl(),
    endpoints: [
      '/api/users',
      '/api/teams',
      '/api/activities',
      '/api/leaderboard',
      '/api/workouts',
    ],
  });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiUrl: getApiBaseUrl() });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(PORT, HOST, () => {
  console.log(`Octofit Tracker API listening at ${getApiBaseUrl()}`);
});
