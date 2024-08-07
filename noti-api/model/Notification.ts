import { Schema, model } from "mongoose";

export interface INotification {
  user_id: string;
  notification_id: object;
  variant: string;
  notificationShownAt: Date;
  position: object;
  isInterested: boolean;
}

const NotificationSchema = new Schema<INotification>(
  {
    user_id: { type: String, required: true },
    notification_id: { type: String},
    variant: { type: String, required: true },
    notificationShownAt: { type: Date, default: Date.now },
    position: {
      type: Object,
      default: {},
    },
    isInterested: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Notification = model<INotification>("Notification", NotificationSchema);

export default Notification;
