import React from "react";
import MenuIcon from "../MenuIcon/MenuIcon";
import SettingsIcon from "../SettingsIcon/SettingsIcon";
import "./Home.css";

const Home = ({ renderSettings, hidingMenu }) => {
  return (
    <div className="home-main-container">
      <div className="home-intro-container">
        <div className="home-line">
          Click{" "}
          <div className="home-icons">
            <MenuIcon hidingMenu={hidingMenu} />
          </div>{" "}
          to create a new secret or to edit an existing one
        </div>
        <div className="home-line">
          Use the search field above to filter secrets by matching values
        </div>
        <div className="home-line">
          Click{" "}
          <div className="home-icons">
            <SettingsIcon renderSettings={renderSettings} />
          </div>{" "}
          to edit your account
        </div>
      </div>
    </div>
  );
};

export default Home;