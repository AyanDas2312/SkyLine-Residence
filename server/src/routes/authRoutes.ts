import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { residentId, email, password, name, flatNo } = req.body;
    const existing = await User.findOne({ $or: [{ email }, { residentId }] });
    if (existing) return res.status(400).json({ message: 'Resident ID or Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      residentId,
      email,
      name: name || `Resident ${residentId}`,
      flatNo: flatNo || 'A-101',
      password: hashedPassword,
      role: 'user'
    });

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '30m' });
    res.status(201).json({ token, user: { id: newUser._id, residentId: newUser.residentId, email: newUser.email, name: newUser.name, flatNo: newUser.flatNo, role: newUser.role } });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
});

// User & Admin Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { identifier, password, role } = req.body; // identifier can be email or residentId
    const user = await User.findOne({
      $or: [{ email: identifier }, { residentId: identifier }]
    });

    if (!user) return res.status(404).json({ message: 'Invalid credentials or user does not exist' });
    if (role && user.role !== role) return res.status(403).json({ message: `Access unauthorized for role: ${role}` });

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '30m' });
    res.json({ token, user: { id: user._id, residentId: user.residentId, email: user.email, name: user.name, flatNo: user.flatNo, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
});

export default router;