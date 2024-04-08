import React from "react";
import "./userNavbar.scss";
import searchicon from "../assets/Rectangle 13.png";
import notifications from "../assets/Rectangle 14.png";
import userimage from "../assets/Ellipse 1.png";
// import { useLoginMutation } from "../Features/userfeatures/User";
const UserNavbar = () => {
  const FirstName =  localStorage.getItem("FirstName");
  const LastName =  localStorage.getItem("LastName");


  return <div className="UserNavbar" >
    <div className="search-bar">
      <img src={searchicon} alt="" />
      <p>search for anything</p>
    </div>
    <div className="notifications">
      <img src={notifications} alt="" />
    </div>
    <div className="user-image">
      <img src={userimage} alt="" />
    </div>
    <div className="username">
      <p>{FirstName} {LastName} </p>
    </div>
  </div>;
};

export default UserNavbar;
