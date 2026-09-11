export * from './User';
export * from './Notice';
export * from './Payment';
export interface User {
  id: string;
  residentId: string;
  email: string;
  name: string;
  flatNo: string;
  role: 'user' | 'admin';
}

export interface Notice {
  _id: string;
  title: string;
  description: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface PaymentRecord {
  _id: string;
  userId: string;
  residentId: string;
  name: string;
  flatNo: string;
  amount: number;
  month: string;
  method: 'Card' | 'UPI' | 'Net Banking' | 'Cash';
  status: 'Paid' | 'Pending';
  transactionId: string;
  createdAt: string;
}