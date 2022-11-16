import * as mongoose from 'mongoose';

export const NotificationTokenSchema = new mongoose.Schema<NotificationToken>({
  userId: { type: String, required: true },
  expoToken: { type: [String] },
});

export interface NotificationToken {
  userId: string;
  expoToken: Array<string>;
}
