import Notification from "../model/Notification";
import { Request, Response } from "express";

interface INotificationRequest extends Request {
  body: {
    user_id: string;
    notification_id: string;
    variant: string;
    notificationShownAt?: Date;
    position: string;
    isInterested: boolean;
  };
}

export const addNotification = async (
  req: INotificationRequest,
  res: Response
) => {
  try {
    const { user_id, notification_id, variant, notificationShownAt, position, isInterested } =
      req.body;
    const notification = await Notification.create({
      user_id,
      notification_id,
      variant,
      notificationShownAt,
      position,
      isInterested,
    });

    res.status(200).json(notification);
  } catch (err: unknown) {
    console.error("Error creating notification:", err); // Log the error for debugging

    let errorMessage = "Failed to create notification";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.status(409).json({ message: errorMessage });
  }
};
