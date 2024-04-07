import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../../Components/UserSidebar";
import UserNavbar from "../../Components/UserNavbar";
import "./userDashboard.scss";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <div className="side-dashboard">
        <UserSidebar />
      </div>
      <div className="main-dashboard">
        <div className="main-dashboard-navbar">
        <UserNavbar />
        </div>
        <div className="main-dashboard-outlet">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
