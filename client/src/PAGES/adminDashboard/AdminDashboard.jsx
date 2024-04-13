import React from "react";
import { Outlet } from "react-router-dom";
import "./adminDashboard.scss"
import AdminNavbar from "../../Components/AdminNavbar";
import AdminSidebar from "../../Components/AdminSidebar";

const AdminDashboard = () => {
  return (

    <div className="AdminDashboard">
      <div className="side-dashboard">
        <AdminSidebar />
      </div>
      <div className="main-dashboard">
        <div className="main-dashboard-navbar">
        <AdminNavbar />
        </div>
        <div className="main-dashboard-outlet">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
