import React from "react";
import { useGetNotificationsQuery } from "../../Features/userfeatures/User";
import "./Notifications.scss";

const Notifications = () => {
  const { data } = useGetNotificationsQuery();

  return (
    <div className="Notifications">
      {data && (
        <table>
          <thead>
            <tr>
              <th className="type-display">Type</th>
              <th className="time-display">Time</th>
              <th className="status-display">Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((notification) => (
              <tr key={notification.id} className={getStatusClass(notification.Status)}>
                <td>{notification.Type}</td>
                <td>{notification.Date}</td>
                <td>{notification.Status}</td>
                <td>{notification.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Function to get the appropriate class based on notification status
const getStatusClass = (status) => {
  switch (status) {
    case "Police Onsite":
      return "police-onsite";
    case "Solved":
      return "solved";
    case "Investigating":
      return "investigating";
    default:
      return "";
  }
};

export default Notifications;
