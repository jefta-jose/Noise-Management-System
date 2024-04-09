import React from "react";
import logo from "../assets/Rectangle 4.png";
import homelogo from "../assets/Rectangle 6.png";
import mailslogo from "../assets/Rectangle 7.png";
import reportlogo from "../assets/Rectangle 8.png";
import logoutlogo from "../assets/Rectangle 12.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./userSidebar.scss";
import { useUpdateUserDetailsMutation } from "../Features/userfeatures/User";

const UserSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigateToHomepage = () => {
    navigate("/userdashboard/userlayout/notifications");
  };

  const handleNavigateToMails = () => {
    navigate("/userdashboard/mails");
  };

  const handleNavigateToReport = () => {
    navigate("/userdashboard/report");
  };

  const handleNavigateToLogout = () => {
    navigate("/");
  };

  ////////////////////////////////////////////////////////////
  

  return (
    <div className="UserSidebar">
      <div className="logo-links">
        <div className="logo">
          <img src={logo} alt="" />
          <p>N/G</p>
        </div>

        <div className="usersidebar-navlinks">
          <div
            className={`home ${pathname === "/userdashboard/userlayout" ? "active" : ""}`}
          >
            <img src={homelogo} alt="" />
            <button onClick={handleNavigateToHomepage}>Homepage</button>
          </div>

          <div
            className={`mail ${pathname === "/userdashboard/mails" ? "active" : ""}`}
          >
            <img src={mailslogo} alt="" />
            <button onClick={handleNavigateToMails}>Mails</button>
          </div>

          <div
            className={`report ${pathname === "/userdashboard/report" ? "active" : ""}`}
          >
            <img src={reportlogo} alt="" />
            <button onClick={handleNavigateToReport}>Report</button>
          </div>

          <div className="logout">
            <img src={logoutlogo} alt="" />
            <button onClick={handleNavigateToLogout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="new-feature">
        <h4>New Feature</h4>
        <p>You can now update your </p>
        <p> Profile at any time </p>
        <button>Check Now</button>
      </div>
    </div>
  );
};

export default UserSidebar;
