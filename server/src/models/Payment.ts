import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  residentId: string;
  name: string;
  flatNo: string;
  amount: number;
  month: string;
  method: 'Card' | 'UPI' | 'Net Banking' | 'Cash';
  status: 'Paid' | 'Pending';
  transactionId: string;
}

const PaymentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  residentId: { type: String, required: true },
  name: { type: String, required: true },
  flatNo: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
  method: { type: String, enum: ['Card', 'UPI', 'Net Banking', 'Cash'], required: true },
  status: { type: String, enum: ['Paid', 'Pending'], default: 'Paid' },
  transactionId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IPayment>('Payment', PaymentSchema);