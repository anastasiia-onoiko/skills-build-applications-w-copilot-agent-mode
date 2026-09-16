import User from '../models/user';
import { Router } from 'express';
import { getApiBaseUrl } from '../utils/apiUrl';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await User.find().populate('teamId').lean();

    res.json({
      resource: 'users',
      items,
      apiUrl: getApiBaseUrl(),
    });
  } catch (error) {
    res.status(500).json({
      resource: 'users',
      message: 'Failed to load users',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;