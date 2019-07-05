import React from "react";
import "./NavMenu.css";
import { Button } from "reactstrap";
import Copy from "../Copy/Copy";

const NavMenu = ({ secrets, hideMenu, bodyHeight, newSecret, editSecret }) => {
  return (
    <div
      style={{
        //width: hideMenu ? "0px" : "240px",
        transform: hideMenu ? "translateX(-100%)" : "translateX(0%)",
        height: bodyHeight
      }}
      className="body-menu-container bg-dark"
    >
      <div className="body-menu-addbtn-container">
        <Button className="btn-success body-menu-addbtn" onClick={newSecret}>
          New Secret
        </Button>
      </div>
      <div className="body-menu-bottom-container">
        {secrets.map((secret, index) => (
          <div key={index} className="secret-container">
            <span
              className="secret-container-label"
              onClick={() => editSecret(secret._id)}
            >{`${secret.Name} `}</span>
            <div className="secret-container-copy">
              {" "}
              <Copy _id={secret._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavMenu;
