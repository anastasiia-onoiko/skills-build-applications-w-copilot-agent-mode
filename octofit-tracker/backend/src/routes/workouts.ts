import Workout from '../models/workout';
import { Router } from 'express';
import { getApiBaseUrl } from '../utils/apiUrl';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Workout.find().populate('userId').lean();

    res.json({
      resource: 'workouts',
      items,
      apiUrl: getApiBaseUrl(),
    });
  } catch (error) {
    res.status(500).json({
      resource: 'workouts',
      message: 'Failed to load workouts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;