import React from "react";
import "../css/navbar.css";
import balls_logo from "../balls-logo.png"

const MyNavbar = props => {
  return (
    <nav className="navbar">
      <a>
        <img src={balls_logo} width="80" height="80" />
      </a>
    </nav>
  );
};

export default MyNavbar;
