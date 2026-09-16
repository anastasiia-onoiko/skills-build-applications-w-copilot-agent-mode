import Activity from '../models/activity';
import { Router } from 'express';
import { getApiBaseUrl } from '../utils/apiUrl';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await Activity.find().populate('userId').lean();

    res.json({
      resource: 'activities',
      items,
      apiUrl: getApiBaseUrl(),
    });
  } catch (error) {
    res.status(500).json({
      resource: 'activities',
      message: 'Failed to load activities',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;