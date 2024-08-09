import { NotificationDetail } from "@/data/prevNotifications";
import { postDataToServer } from "@/utils/utils";
import { SnackbarKey, useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CustomNoti from "./CustomNoti";

declare module "notistack" {
  interface VariantOverrides {
    reportComplete: true;
  }
}

const NotiVideo = ({
  prevNotifications,
}: {
  prevNotifications: NotificationDetail[];
}) => {
  const [userId, setUserId] = useState<string>("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [startNotifications, setStartNotifications] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [notifications, setNotifications] = useState<NotificationDetail[]>([]);
  const [notificationShownTimestamps, setNotificationShownTimestamps] = useState<Map<SnackbarKey, number>>(new Map());

  const action = (
    snackbarId: SnackbarKey | undefined,
    notification_id: NotificationDetail["notification_id"],
    variant: NotificationDetail["variant"],
    position: NotificationDetail["position"]
  ) => (
    <div className="flex gap-4">
      <button
        onClick={() => {
          const shownAt = notificationShownTimestamps.get(notification_id);
          postDataToServer("notifications", {
            user_id: userId,
            notification_id,
            variant,
            notificationShownAt: shownAt,
            position,
            isInterested: true,
          });
          closeSnackbar(snackbarId);
        }}
      >
        Got it!
      </button>
      <button
        onClick={() => {
          const shownAt = notificationShownTimestamps.get(notification_id);
          postDataToServer("notifications", {
            user_id: userId,
            notification_id,
            variant,
            notificationShownAt: shownAt,
            position,
            isInterested: false,
          });
          closeSnackbar(snackbarId);
        }}
      >
        Dismiss
      </button>
    </div>
  );

  const handleEnqueueSnackbar = (
    message: string,
    notification_id: NotificationDetail["notification_id"],
    variant: NotificationDetail["variant"],
    position: NotificationDetail["position"],
    delay: number,
    detail?: string
  ) => {
    setTimeout(() => {
      enqueueSnackbar(message, {
        variant,
        hideIconVariant: true,
        autoHideDuration: null,
        action: (key: any) => action(key, notification_id, variant, position),
        anchorOrigin: position,
        content:
          variant === "reportComplete"
            ? (key) => (
                <CustomNoti
                  userId={userId}
                  notification_id={notification_id}
                  id={key}
                  message={message}
                  detail={detail}
                  variant={variant}
                  hideIconVariant={true}
                  style={{}}
                  iconVariant={{}}
                  anchorOrigin={position}
                  persist={true}
                  notificationShownAt={notificationShownTimestamps.get(notification_id)}
                />
              )
            : undefined,
      });
      setNotificationShownTimestamps(prev => new Map(prev).set(notification_id, Date.now()));
    }, delay);
  };

  useEffect(() => {
    setUserId(uuidv4());
  }, []);

  useEffect(() => {
    if (!startNotifications || !videoRef.current) return;

    const generateNotifications = () => {
      const generatedNotifications: NotificationDetail[] = [];
      const timestamps = [7000, 50000, 105000, 150000, 180000, 210000];
      let timestampIndex = 0;

      prevNotifications.forEach((prevNoti: NotificationDetail) => {
        const timestamp = timestamps[timestampIndex % timestamps.length];
        const newNotification: NotificationDetail = {
          ...prevNoti,
          timestamp,
        };
        generatedNotifications.push(newNotification);
        timestampIndex++;
      });

      setNotifications(generatedNotifications);
    };

    generateNotifications();
  }, [startNotifications]);

  useEffect(() => {
    if (startNotifications && notifications.length > 0 && videoRef.current) {
      notifications.forEach((notification) => {
        const {
          notification_id,
          content,
          variant,
          position,
          timestamp,
          detail,
        } = notification;
        const videoCurrentTime = videoRef.current?.currentTime || 0;
        const delay = timestamp ? timestamp - videoCurrentTime * 1000 : 0;

        handleEnqueueSnackbar(
          content,
          notification_id,
          variant,
          position,
          Math.max(delay, 0),
          detail
        );
      });
    }
  }, [startNotifications, notifications]);

  return (
    <div className=" flex flex-col items-center justify-center gap-4 ">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-4 border border-blue-700 rounded"
        onClick={() => {
          setStartNotifications(true);
          if (videoRef.current) {
            videoRef.current.play();
          }
        }}
      >
        Start Notifications
      </button>
      <video muted className="hidden" ref={videoRef} width="960" height="720" controls>
        <source src="/assets/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default NotiVideo;
