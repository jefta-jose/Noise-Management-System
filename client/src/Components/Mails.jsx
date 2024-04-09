import React, { useState } from "react";
import {
  useCreateMailMutation,
  useGetUserEmailsQuery,
} from "../Features/userfeatures/User.js";
import pen from "../assets/pen-square-svgrepo-com.png";
import inbox from "../assets/inbox-star-svgrepo-com.png";
import snoozed from "../assets/snooze-svgrepo-com.png";
import sent from "../assets/sent-mail-svgrepo-com.png";
import draft from "../assets/draft-svgrepo-com.png";
import starred from "../assets/starred-svgrepo-com.png";
import "./Mails.scss";
import box from "../assets/email-svgrepo-com.png";

const Mails = () => {
  const id = localStorage.getItem("UserID");
  const { data: emailDatas } = useGetUserEmailsQuery(id);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleGoBack = () => {
    setSelectedEmail(null);
  };

  const [AdminID, setAdminID] = useState("1");
  const [Subject, setSubject] = useState("");
  const [Email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [createEmail] = useCreateMailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmail({ id, AdminID, Subject, Email });
      setIsOpen(false);
      // Reset Subject and Email fields
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
            <span onClick={handleCloseModal} >x</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="subject">
                <label htmlFor="emailSubject">AdminID:</label>
                <input
                  className="AdminID"
                  id="AdminID"
                  type="text"
                  value={AdminID}
                  onChange={(e) => setAdminID(e.target.value)}
                  placeholder="Subject"
                />
              </div>
              <div>
                <label htmlFor="emailContent">Subject:</label>
                <input
                  id="Subject"
                  type="text"
                  value={Subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Content"
                />
              </div>
              <div>
                <label htmlFor="emailBody">Email:</label>
                <input
                  id="Email"
                  type="text"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Body"
                />
              </div>
              <button className="send-mail" type="submit">Send</button>
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
                    <img
                      style={{ marginRight: "50px" }}
                      src={box}
                      alt=""
                    />
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

export default Mails;
