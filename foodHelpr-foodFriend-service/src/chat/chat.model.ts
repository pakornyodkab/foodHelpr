import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true },
    senderId: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: true } },
);

export interface Chat {
  roomId: string;
  senderId: string;
  message: string;
}
