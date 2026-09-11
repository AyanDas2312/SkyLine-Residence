import mongoose, { Schema, Document } from 'mongoose';

export interface INotice extends Document {
  title: string;
  description: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
}

const NoticeSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' }
}, { timestamps: true });

export default mongoose.model<INotice>('Notice', NoticeSchema);