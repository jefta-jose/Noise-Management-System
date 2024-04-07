import React from "react";
import { useGetFeedbackQuery } from "../../Features/userfeatures/User";
import "./Feedback.scss"

const Feedback = () => {
  const UserID = localStorage.getItem("UserID");
  const { data } = useGetFeedbackQuery(UserID);

  return <div className="Feedback">
    {data &&
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {data.map((feedback) => (
          <tr key={feedback.id}>
            <td>{feedback.Date}</td>
            <td>{feedback.Message}</td>
          </tr>
        ))}
      </tbody>
    </table>}
    </div>;
};

export default Feedback;
