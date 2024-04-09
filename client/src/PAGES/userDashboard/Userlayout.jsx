import React from "react";
import { Outlet } from "react-router-dom";
import UserImage from "../../assets/Ellipse 2.png";
import "./Userlayout.scss";
import { useNavigate, useLocation } from "react-router-dom";

const Userlayout = () => {
  const FirstName = localStorage.getItem("FirstName");
  const LastName = localStorage.getItem("LastName");
  const County = localStorage.getItem("County");
  const Residence = localStorage.getItem("Residence");
  const PhoneNumber = localStorage.getItem("PhoneNumber");
  const Email = localStorage.getItem("Email");
  const NationalID = localStorage.getItem("NationalID");
  const Occupation = localStorage.getItem("Occupation");
  const Gender = localStorage.getItem("Gender");
  const navigate = useNavigate();

  const {pathname} = useLocation();


  const navigateToFeedback = ()=>{
    navigate("feedback");
  }

  const navigateToNotifications = ()=>{
    navigate("notifications");
  }

  const handleNavigateToMails = () => {
    navigate("/userdashboard/report");
  };


  return (
    <div className="Userlayout">
      <div className="profile-name">
        <p>{FirstName}'s Profile</p>
        <span>-</span>
      </div>
      <div className="user-details">
        <div className="profile-image">
          <img src={UserImage} alt="" />
          <p>
            {FirstName} {LastName}
          </p>
        </div>
        <div className="profile-details">
          <div className="row-one">
            <p>County: {County}</p>
            <p>Residence: {Residence}</p>
            <p>PhoneNumber: {PhoneNumber}</p>
          </div>
          <div className="row-two">
            <p>Email: {Email}</p>
            <p>NationalID: {NationalID}</p>
            <p>Occupation: {Occupation}</p>
          </div>
          <div className="row-three">
            <p>Gender: {Gender}</p>
            <button onClick={handleNavigateToMails} >Need Help Assap!!</button>
          </div>
        </div>
      </div>
      <div className="notifications-feedback">
        <div className="notifications-feedback-btns">
          <button className={pathname === "/userdashboard/userlayout/notifications" ? "active" : ""} onClick={navigateToNotifications} >Notifications</button>
          <button className={pathname === "/userdashboard/userlayout/feedback" ? "active" : ""} onClick={navigateToFeedback} >Feedback</button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Userlayout;
