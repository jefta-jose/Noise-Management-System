import React, { useState } from "react";
import { useCreateAdminMailMutation, useGetAllMailsQuery, useGetAllUsersQuery } from "../../Features/userfeatures/Admin";
import pen from "../../assets/pen-square-svgrepo-com.png";
import inbox from "../../assets/inbox-star-svgrepo-com.png";
import snoozed from "../../assets/snooze-svgrepo-com.png";
import sent from "../../assets/sent-mail-svgrepo-com.png";
import draft from "../../assets/draft-svgrepo-com.png";
import starred from "../../assets/starred-svgrepo-com.png";
import box from "../../assets/email-svgrepo-com.png";
import "./adminMails.scss";

const AdminMails = () => {
  const id = localStorage.getItem("AdminID");
  const { data: emailDatas } = useGetAllMailsQuery();
  const { data: userData } = useGetAllUsersQuery(); // Fetch user data
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [UserID, setUserID] = useState("");
  const [Subject, setSubject] = useState("");
  const [Email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [createEmail] = useCreateAdminMailMutation();

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleGoBack = () => {
    setSelectedEmail(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmail({ id, UserID, Subject, Email });
      setIsOpen(false);
      // Reset Subject and Email fields
      setUserID("");
      setSubject("");
      setEmail("");
    } catch (error) {
      console.error("Error creating email:", error);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="email-container">
      <div className="create-emails">
        <div className="email-icons">
          <img src={pen} className="pen" onClick={handleOpenModal} />
          <div className="useless-icons">
            <img src={inbox} alt="" />
            <img src={starred} alt="" />
            <img src={snoozed} alt="" />
            <img src={sent} alt="" />
            <img src={draft} alt="" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="custom-modal">
          <div className="modal-content">
            <div className="email-header">
              <h2>Create Email</h2>
              <span onClick={handleCloseModal}>x</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="subjectt">
                <label htmlFor="emailSubject">UserID:</label>
                <select
                  className="UserID"
                  id="UserID"
                  value={UserID}
                  onChange={(e) => setUserID(e.target.value)}
                  placeholder="Subject"
                >
                  <option value="">Select User</option>
                  {userData &&
                    userData.map((user) => (
                      <option key={user.UserID} value={user.UserID}>
                        {user.FirstName} {user.LastName} ({user.Email}) - {user.UserID}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="emailSubject">Subject:</label>
                <input
                  id="Subject"
                  type="text"
                  value={Subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                />
              </div>
              <div>
                <label htmlFor="emailBody">Email:</label>
                <input
                  id="Email"
                  type="text"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <button className="send-mail" type="submit">
                Send
              </button>
            </form>
            <button className="close-modal" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="display-inbox">
        <div className="msg-one">
          {selectedEmail ? (
            <div className="selected-email">
              <div className="email-cont">
                <button onClick={handleGoBack}>Go Back</button>
                <h3>{selectedEmail.Subject}</h3>
                <span className="email-body">{selectedEmail.Email}</span>
                <p>{selectedEmail.Date}</p>
                <button>Reply</button>
                <button>Forward</button>
              </div>
            </div>
          ) : (
            <ul className="inbox">
              {emailDatas &&
                emailDatas.map((email) => (
                  <li
                    className="email-item"
                    key={email.RecordID}
                    onClick={() => handleEmailClick(email)}
                  >
                    <img style={{ marginRight: "50px" }} src={box} alt="" />
                    <p style={{ marginRight: "50px" }}>{email.Subject}</p>
                    <span className="date">{email.Date}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMails;
