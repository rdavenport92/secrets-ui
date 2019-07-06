import React from "react";
import "./SettingsIcon.css";
import settingsIcon from "../../assets/settings.png";

const SettingsIcon = ({ renderSettings }) => {
  return (
    <img
      alt="settingsIcon"
      className="settings-icon"
      src={settingsIcon}
      onClick={renderSettings}
    />
  );
};
export default SettingsIcon;
