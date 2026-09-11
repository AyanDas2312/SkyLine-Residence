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