import React from "react";
import user from "../../assets/image/user-icon.jpg";
import "../styles/header.css";
const Header = () => {
  return (
    <header>
      <div className="title-container">
        <h2>
          <span className="blue">POS</span> <span className="orange">WITH</span>{" "}
          <span className="green">RFID</span>
        </h2>
      </div>
      <div className="icons-container">
        <i class="bx bxs-envelope"></i>
        <i class="bx bxs-bell"></i>
        <div className="acct-container">
          <div className="img-container">
            <img src={user} />
          </div>
          <div className="acc-details">
            <span className="user-name">Admin</span>
            <span className="user-type">Admin account</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
