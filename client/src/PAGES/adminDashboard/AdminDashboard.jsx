import React from "react";
import { Outlet } from "react-router-dom";
import "./adminDashboard.scss"

const AdminDashboard = () => {
  return (
    <div className="adminDashboard">
      adminDashboard
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
