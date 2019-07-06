import React, { Component } from "react";
import "./EditUser.css";
import { Input, Button } from "reactstrap";

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        Password: "",
        Confirm: ""
      }
    };
  }

  updateUserState = (e, key) => {
    let user = { ...this.state.user };
    user[key] = e.target.value;
    this.setState({
      user
    });
  };
  updateProfile = () => {
    let user = { ...this.state.user };
    if (user.Password !== user.Confirm) {
      user.error = "Passwords do not match!";
      user.success = "";
      this.setState({
        user
      });
    } else if (user.Password === "" || user.Confirm === "") {
      user.error = "Fill out both fields before proceeding!";
      user.success = "";
      this.setState({
        user
      });
    } else {
      let storedUser = JSON.parse(localStorage.getItem("user"));
      let _id = storedUser._id;
      let Password = user.Password;
      fetch(`${this.props.api}${this.props.routes[2]}/${_id}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Password
        })
      })
        .then(res =>
          res.json().then(json => {
            if (json.error) {
              user.error = json.error;
              user.success = "";
              this.setState({
                user
              });
            } else if (json.success) {
              user.error = "";
              user.success = json.success;
              user.Password = "";
              user.Confirm = "";
              this.setState({
                user
              });
            }
          })
        )
        .catch(err => {
          user.error = err.message;
          user.success = "";
          this.setState({
            user
          });
        });
    }
  };
  render() {
    return (
      <div className="edit-user-body">
        <div className="edit-user-group">
          <div className="edit-user-label-input">
            <div className="edit-user-label">New Password:</div>
            <div className="edit-user-input">
              <Input
                onChange={e => this.updateUserState(e, "Password")}
                value={this.state.user.Password}
                type="password"
              />
            </div>
          </div>
          <div className="edit-user-label-input">
            <div className="edit-user-label">Confirm Password:</div>
            <div className="edit-user-input">
              <Input
                onChange={e => this.updateUserState(e, "Confirm")}
                value={this.state.user.Confirm}
                type="password"
              />
            </div>
          </div>
        </div>
        <div className="edit-user-button-container">
          <Button onClick={this.updateProfile} className="btn-success">
            Update
          </Button>
        </div>
        <div className="edit-user-error-success-container">
          <div className="edit-user-error">{this.state.user.error}</div>
          <div className="edit-user-success">{this.state.user.success}</div>
        </div>
      </div>
    );
  }
}
