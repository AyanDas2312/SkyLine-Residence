import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  residentId: string;
  email: string;
  password?: string;
  name: string;
  flatNo: string;
  role: 'user' | 'admin';
}

const UserSchema: Schema = new Schema({
  residentId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  flatNo: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);