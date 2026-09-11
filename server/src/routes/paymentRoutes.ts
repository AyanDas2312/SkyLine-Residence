import { Router, Response } from 'express';
import Payment from '../models/Payment';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Process/Create Payment (Protected)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const payment = await Payment.create({
      ...req.body,
      userId: req.user?.id,
      transactionId: req.body.method === 'Cash' 
        ? `CASH-REC-${Math.floor(100000 + Math.random() * 900000)}` 
        : `TXN-${Date.now()}`
    });
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Payment processing failed' });
  }
});

// Admin: Get all resident payment ledgers
router.get('/all', authenticateToken, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load payments ledger' });
  }
});

export default router;