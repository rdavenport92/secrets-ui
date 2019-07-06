import React from "react";
import menuIcon from "../../assets/menu.png";
import "./MenuIcon.css";

const MenuIcon = ({ hidingMenu }) => {
  return (
    <img
      alt="menuIcon"
      className="menu-icon"
      src={menuIcon}
      onClick={hidingMenu}
    />
  );
};

export default MenuIcon;
