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
    content: "Enjoy watching this amazing video!",
  },
  {
    notification_id: "notification2",
    variant: "reportComplete",
    position: { vertical: "bottom", horizontal: "center" },
    content: "You have a message!",
    detail: "The series will showcase the rich diversity of Earth’s seven continents and what makes each one unique.",
  },
  {
    notification_id: "notification3",
    variant: "info",
    position: { vertical: "bottom", horizontal: "right" },
    content: "The song ‘Out There’ in this trailer is a collaboration between Sia and Hans Zimmer.",
  },
  {
    notification_id: "notification4",
    variant: "reportComplete",
    position: { vertical: "bottom", horizontal: "left" },
    content: "You have a message!",
    detail: "Wildlife Spotlight: Look out for the elusive snow leopard in the mountain ranges of Asia.",
  },
  {
    notification_id: "notification5",
    variant: "info",
    position: { vertical: "bottom", horizontal: "center" },
    content: "Fact Check: Africa's Sahara Desert is so vast it could fit the United States within its boundaries!",
  },
  {
    notification_id: "notification6",
    variant: "reportComplete",
    position: { vertical: "bottom", horizontal: "right" },
    content: "You have a message!",
    detail: "\"Seven Worlds: One Planet\" is an eye-opening journey around a world you thought you knew.",
  },
];

export default prevNotifications;
