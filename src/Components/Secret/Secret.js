import React from "react";
import Copy from "../Copy/Copy";
import Edit from "../Edit/Edit";
import { Card, CardHeader, CardText, CardBody } from "reactstrap";
import "./Secret.css";

const Secret = ({ _id, Name, Description, editSecret }) => {
  return (
    <div className="secret-component-container">
      <Card className="secret-component-card">
        <CardHeader>
          <div className="secret-component-main">
            <div className="secret-component-left">
              <span className="secret-component-header">{Name}</span>
              <span className="secret-component-id">{` | ${_id}`}</span>
            </div>
            <div className="secret-component-right">
              <div className="card-icon">
                <Copy _id={_id} />
              </div>
              <div className="card-icon">
                <Edit editSecret={editSecret} _id={_id} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <CardText>{Description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Secret;
