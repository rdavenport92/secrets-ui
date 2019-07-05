import React from "react";
import "./Edit.css";
import edit from "../../assets/edit.png";

const Edit = ({ editSecret, _id }) => {
  return (
    <img className="edit-img" src={edit} onClick={() => editSecret(_id)} />
  );
};

export default Edit;
