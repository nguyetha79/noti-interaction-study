import { useEffect, useState } from "react";
import NotiVideo from "./components/NotiVideo";
import prevNotifications, {
  NotificationDetail,
} from "./data/prevNotifications";
import { getDataFromServer, postDataToServer } from "./utils/utils";

// Define interfaces for the expected data structures
interface LatinSquareData {
  currentOrder: number[];
}

function App(): JSX.Element {
  const [orderedNotifications, setOrderedNotifications] = useState<
    NotificationDetail[]
  >([]);
  // Define type for the order parameter in getTasksForOrder
  const getNotisForOrder = (order: number[]): typeof prevNotifications => {
    return [
      prevNotifications[order[0] - 1],
      prevNotifications[order[1] - 1],
      prevNotifications[order[2] - 1],
      prevNotifications[order[3] - 1],
      prevNotifications[order[4] - 1],
      prevNotifications[order[5] - 1],
    ];
  };

  // SetStudyOrder function is asynchronous
  const setStudyOrder = async (): Promise<void> => {
    try {
      const data = await getDataFromServer<LatinSquareData>("latinsquare");
      let ord = getNotisForOrder(data!.currentOrder);
      console.log(ord)
      setOrderedNotifications(ord)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await setStudyOrder();

      try {
        const lsUrl = "latinsquare";
        await postDataToServer(lsUrl, {
          index: 2,
          currentOrder: [2, 3, 4, 5, 6, 1],
        });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <NotiVideo prevNotifications={orderedNotifications} />
    </div>
  );
}

export default App;
