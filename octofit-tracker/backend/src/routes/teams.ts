import Team from '../models/team';
import { Router } from 'express';
import { getApiBaseUrl } from '../utils/apiUrl';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Team.find().lean();

    res.json({
      resource: 'teams',
      items,
      apiUrl: getApiBaseUrl(),
    });
  } catch (error) {
    res.status(500).json({
      resource: 'teams',
      message: 'Failed to load teams',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;