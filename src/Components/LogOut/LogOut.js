import React from "react";
import "./LogOut.css";
import logout from "../../assets/logout.png";

const LogOut = ({ logOut }) => {
  return (
    <img className="logout-icon" onClick={logOut} alt="logOut" src={logout} />
  );
};

export default LogOut;
