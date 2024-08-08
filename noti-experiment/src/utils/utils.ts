export const URL = "https://noti-interaction-study.onrender.com/api/";

export async function postDataToServer(url: string, data: any): Promise<void> {
  try {
    const response = await fetch(URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to save data to the server");
    }
    console.log("Data saved successfully to the server");
  } catch (error) {
    // Type the error as an instance of Error
    if (error instanceof Error) {
      console.error("Error while posting data to the server:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

export async function getDataFromServer<T>(url: string): Promise<T | undefined> {
  try {
    const response = await fetch(URL + url);

    // Check if response is successful (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const object: T = await response.json();

    if (object === null) {
      throw new Error("Failed to fetch data from server");
    }

    console.log("Data fetched from server");
    return object;
  } catch (error) {
    // Ensure error is an instance of Error to access the message property
    if (error instanceof Error) {
      console.error("Error while fetching data:", error.message);
      console.log(error)
    } else {
      console.error("Unknown error occurred while fetching data");
    }
  }
}
