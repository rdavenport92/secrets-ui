import React, { Component } from "react";
import EditUser from "./EditUser/EditUser";
import AddUser from "./AddUser/AddUser";
import "./Settings.css";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsPage: "edit"
    };
  }
  render() {
    return (
      <div className="settings-main-container">
        <div className="settings-header">
          <div className="settings-header-wrapper">
            <h4
              className={`settings-tab ${
                this.state.settingsPage === "edit" ? "active" : null
              }`}
              onClick={() => this.setState({ settingsPage: "edit" })}
            >
              Edit Profile
            </h4>
            <h4>|</h4>
            <h4
              className={`settings-tab ${
                this.state.settingsPage === "new" ? "active" : null
              }`}
              onClick={() => this.setState({ settingsPage: "new" })}
            >
              Create User
            </h4>
          </div>
        </div>
        {this.state.settingsPage === "edit" ? (
          <EditUser api={this.props.api} routes={this.props.routes} />
        ) : (
          <AddUser api={this.props.api} routes={this.props.routes} />
        )}
      </div>
    );
  }
}
