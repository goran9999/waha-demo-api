import mongoose from 'mongoose';
import { User } from './user.model';

export interface UserContact {
  user: User;
  phoneNumber: string;
  messages: Message[];
}

export interface Message {
  body: string;
  images: string[];
  from: string;
  fromMe: boolean;
  hasMedia: boolean;
  to: string;
  sentAt: Date;
}

const messageSchema = new mongoose.Schema<Message>({
  body: { type: String, required: true },
  images: [String],
  from: { type: String, required: true },
  to: { type: String, required: true },
  fromMe: Boolean,
  hasMedia: Boolean,
  sentAt: { type: Date, required: true },
});

export const userContactSchema = new mongoose.Schema<UserContact>({
  messages: [messageSchema],
  phoneNumber: String,
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
});

export const UserContactModel = mongoose.model(
  'UserContact',
  userContactSchema
);
