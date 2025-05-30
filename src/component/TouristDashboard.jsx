import React, { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket } from "../service/websocketService";

const TouristDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const touristId = 123; // Replace with actual logged-in tourist ID

  useEffect(() => {
    connectWebSocket(touristId, (message) => {
      setNotifications((prev) => [...prev, message]);
    });

    return () => {
      disconnectWebSocket();
    };
  }, [touristId]);

  return (
    <div>
      <h2>Tourist Dashboard</h2>
      <div>
        <h3>Notifications</h3>
        <ul>
          {notifications.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TouristDashboard;
