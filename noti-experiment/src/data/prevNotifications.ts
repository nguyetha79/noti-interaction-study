export interface NotificationDetail {
  notification_id: string;
  variant: "info" | "reportComplete";
  timestamp?: number;
  position: { vertical: "bottom"; horizontal: "left" | "center" | "right" };
  content: string;
  detail?: string;
}

const prevNotifications: NotificationDetail[] = [
  {
    notification_id: "notification1",
    variant: "info",
    position: { vertical: "bottom", horizontal: "left" },
    content: "Welcome! Enjoy watching this amazing video!",
  },
  {
    notification_id: "notification2",
    variant: "reportComplete",
    position: { vertical: "bottom", horizontal: "center" },
    content: "You have a message!",
    detail: "Like what you're seeing? Consider subscribing!",
  },
  {
    notification_id: "notification3",
    variant: "info",
    position: { vertical: "bottom", horizontal: "right" },
    content: "Video quality options are available. Check them out!",
  },
  {
    notification_id: "notification4",
    variant: "reportComplete",
    position: { vertical: "bottom", horizontal: "left" },
    content: "You have a message!",
    detail: "Don't forget to hit the like button if you enjoy the content!",
  },
  {
    notification_id: "notification5",
    variant: "info",
    position: { vertical: "bottom", horizontal: "center" },
    content: "Remember to turn on notifications for more updates.",
  },
  {
    notification_id: "notification6",
    variant: "reportComplete",
    position: { vertical: "bottom", horizontal: "right" },
    content: "You have a message!",
    detail: "Explore related videos by visiting our channel.",
  },
];

export default prevNotifications;
