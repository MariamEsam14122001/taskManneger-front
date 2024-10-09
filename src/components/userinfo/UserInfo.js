import React from "react";
import "./style.css";
import profile from "../../assets/profileimage.svg";
import icon from "../../assets/icon.svg";

const UserInfo = () => (
  <div id="info">
    <img src={profile} alt="profile" />
    <div>
      <p id="name" style={{ color: "black" }}>
        Mariam Essam
      </p>
      <p id="location">Alexandria, Egypt</p>
    </div>
    <img src={icon} alt="notification" id="notf" />
  </div>
);

export default UserInfo;
