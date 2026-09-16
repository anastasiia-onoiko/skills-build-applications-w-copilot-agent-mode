import Leaderboard from '../models/leaderboard';
import { Router } from 'express';
import { getApiBaseUrl } from '../utils/apiUrl';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Leaderboard.find()
      .populate('userId')
      .populate('teamId')
      .sort({ rank: 1 })
      .lean();

    res.json({
      resource: 'leaderboard',
      items,
      apiUrl: getApiBaseUrl(),
    });
  } catch (error) {
    res.status(500).json({
      resource: 'leaderboard',
      message: 'Failed to load leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;