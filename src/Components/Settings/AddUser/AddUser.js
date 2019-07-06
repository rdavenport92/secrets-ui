import React, { Component } from "react";
import "./AddUser.css";
import { Input, Button } from "reactstrap";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        Firstname: "",
        Lastname: "",
        Email: "",
        Username: "",
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
  addUser = () => {
    let user = { ...this.state.user };
    for (let key in user) {
      if (key !== "error" && key !== "success" && user[key] === "") {
        user.error = "Please fill out all fields before proceeding!";
        user.success = "";
        this.setState({
          user
        });
        return;
      }
    }
    if (user.Password !== user.Confirm) {
      user.error = "Passwords do not match!";
      user.success = "";
      this.setState({
        user
      });
      return;
    }
    if (!user.Email.includes("@wwt.com")) {
      user.error = "Please enter a valid email address!";
      user.success = "";
      this.setState({
        user
      });
      return;
    }
    let newUser = {
      Firstname: user.Firstname,
      Lastname: user.Lastname,
      Email: user.Email,
      Username: user.Username,
      Password: user.Password
    };
    fetch(`${this.props.api}${this.props.routes[2]}`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => {
        res.json().then(json => {
          if (json.errors) {
            user.error = json.message;
            user.success = "";
            this.setState({
              user
            });
          } else if (json.error) {
            user.error = json.error;
            user.success = "";
            this.setState({
              user
            });
          } else {
            user.Firstname = "";
            user.Lastname = "";
            user.Email = "";
            user.Username = "";
            user.Password = "";
            user.Confirm = "";
            user.error = "";
            user.success = "Profile successfully created!";
            this.setState({
              user
            });
          }
        });
      })
      .catch(err => {
        console.log(err);
        user.error = err.message;
        user.success = "";
        this.setState({
          user
        });
      });
  };
  render() {
    return (
      <div className="add-user-body">
        <div className="add-user-group">
          <div className="add-user-row">
            <InputGroup
              label={"First Name:"}
              field={"Firstname"}
              value={this.state.user.Firstname}
              updateUserState={this.updateUserState}
              addUser={this.addUser}
            />
            <InputGroup
              label={"Last Name:"}
              field={"Lastname"}
              value={this.state.user.Lastname}
              updateUserState={this.updateUserState}
              addUser={this.addUser}
            />
          </div>
          <div className="add-user-row">
            <InputGroup
              label={"Email:"}
              field={"Email"}
              value={this.state.user.Email}
              updateUserState={this.updateUserState}
              addUser={this.addUser}
            />
            <InputGroup
              label={"Username:"}
              field={"Username"}
              value={this.state.user.Username}
              updateUserState={this.updateUserState}
              addUser={this.addUser}
            />
          </div>
          <div className="add-user-row">
            <InputGroup
              label={"Password:"}
              field={"Password"}
              value={this.state.user.Password}
              updateUserState={this.updateUserState}
              addUser={this.addUser}
            />
            <InputGroup
              label={"Confirm Password:"}
              field={"Confirm"}
              value={this.state.user.Confirm}
              updateUserState={this.updateUserState}
              addUser={this.addUser}
            />
          </div>
        </div>
        <div className="add-user-button-container">
          <Button onClick={this.addUser} className="btn-success">
            Add User
          </Button>
        </div>
        <div className="add-user-error-success-container">
          <div className="add-user-error">{this.state.user.error}</div>
          <div className="add-user-success">{this.state.user.success}</div>
        </div>
      </div>
    );
  }
}

const InputGroup = ({ label, field, value, updateUserState, addUser }) => {
  return (
    <div className="add-user-label-input">
      <div className="add-user-label">{label}</div>
      <div className="add-user-input">
        <form
          onSubmit={e => {
            e.preventDefault();
            addUser();
          }}
        >
          <Input
            type={
              field === "Password"
                ? "password"
                : field === "Confirm"
                ? "password"
                : "text"
            }
            value={value}
            onChange={e => updateUserState(e, field)}
          />
        </form>
      </div>
    </div>
  );
};
