import { Log } from "../../logging_middleware/logger";

const API = "/notifications";

type Notification = {
  ID: string;
  Type: "Event" | "Result" | "Placement";
  Message: string;
  Timestamp: string;
};

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export async function getPriorityNotifications(limit = 10) {
  try {
    const token = localStorage.getItem("access_token");

    const res = await fetch(API, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    let notifications: Notification[] = data.notifications;

    notifications.sort((a, b) => {
      const pDiff = priorityMap[b.Type] - priorityMap[a.Type];
      if (pDiff !== 0) return pDiff;

      return (
        new Date(b.Timestamp).getTime() -
        new Date(a.Timestamp).getTime()
      );
    });

    Log("frontend", "info", "api", "Fetched notifications");

    return notifications.slice(0, limit);
  } catch (error) {
    Log("frontend", "error", "api", "Failed to fetch notifications");
    throw error;
  }
}