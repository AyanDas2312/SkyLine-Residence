import { Router, Request, Response } from 'express';
import Notice from '../models/Notice';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Public: Get all notices
router.get('/', async (_req: Request, res: Response) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notices' });
  }
});

// Admin only: Create notice
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post notice' });
  }
});

// Admin only: Delete notice
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notice deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete notice' });
  }
});

export default router;