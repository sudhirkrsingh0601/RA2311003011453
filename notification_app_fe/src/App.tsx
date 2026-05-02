import { useEffect, useState } from "react";
import { getPriorityNotifications } from "./notificationService";
import "./App.css";

type Notification = {
  ID: string;
  Type: "Event" | "Result" | "Placement";
  Message: string;
  Timestamp: string;
};

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPriorityNotifications()
      .then((data) => {
        setNotifications(data);
      })
      .catch((err) => {
        console.error("Error fetching notifications", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <div className="card">
        <h1>Priority Notification Inbox</h1>
        <p className="subtitle">
          Top 10 notifications sorted by Placement, Result, Event and latest timestamp.
        </p>

        {loading ? (
          <p>Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p>No notifications available</p>
        ) : (
          <div className="notification-list">
            {notifications.map((n, index) => (
              <div key={n.ID} className="notification-card">
                <div className="notification-header">
                  <span className="rank">#{index + 1}</span>
                  <span className={`badge ${n.Type.toLowerCase()}`}>
                    {n.Type}
                  </span>
                </div>

                <h2>{n.Message}</h2>
                <p>{new Date(n.Timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;