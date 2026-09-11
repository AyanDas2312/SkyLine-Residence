import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import noticeRoutes from './routes/noticeRoutes';
import paymentRoutes from './routes/paymentRoutes';
import User from './models/User';
import Notice from './models/Notice';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/payments', paymentRoutes);

// Seed Admin & Default Notices
const seedDatabase = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@skyline.com';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@12345', 10);
    await User.create({
      residentId: 'ADMIN-001',
      email: adminEmail,
      name: 'Executive Administrator',
      flatNo: 'Tower 1 - HQ',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Default Admin seeded (admin@skyline.com / Admin@12345)');
  }

  const noticesCount = await Notice.countDocuments();
  if (noticesCount === 0) {
    await Notice.insertMany([
      { title: 'Annual General Body Meeting', description: 'Scheduled on Sunday, 10:00 AM at Clubhouse Hall A.', date: 'Oct 20, 2026', priority: 'High' },
      { title: 'Elevator Maintenance (Tower 2)', description: 'Service work between 1:00 PM and 4:00 PM on Thursday.', date: 'Oct 24, 2026', priority: 'Medium' },
      { title: 'Diwali Lighting Celebration', description: 'Terrace garden gathering and sweets distribution at 6:30 PM.', date: 'Nov 01, 2026', priority: 'Low' }
    ]);
    console.log('Default notices seeded.');
  }
};

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  seedDatabase();
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});