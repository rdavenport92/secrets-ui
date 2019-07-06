import React, { Component } from "react";
import App from "./App";
import Login from "./Components/Login/Login";

export default class ValidateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      Username: "",
      Password: "",
      error: ""
    };
    this.path = "http://localhost:3020";
    this.api = `${this.path}/api/`;
    this.routes = ["secrets", "login", "users"];
  }
  componentDidMount = () => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      this.setState({ loggedIn: true });
    }
  };
  login = () => {
    if (this.state.Username === "" || this.state.Password === "") {
      this.setState({
        error: "Please fill out both fields"
      });
      return;
    }
    fetch(`${this.api}${this.routes[1]}`, {
      method: "POST",
      body: JSON.stringify({
        Username: this.state.Username,
        Password: this.state.Password
      }),
      headers: { "Content-Type": "application/json" }
    }).then(res =>
      res.json().then(json => {
        if (json.error) {
          this.setState({
            error: json.error
          });
        } else if (!json.result) {
          this.setState({
            error: "Invalid password!"
          });
        } else {
          localStorage.setItem("token", json.token);
          localStorage.setItem("user", JSON.stringify(json.user));
          this.setState({
            loggedIn: true,
            error: "",
            Username: "",
            Password: ""
          });
        }
      })
    );
  };
  logOut = () => {
    localStorage.clear();
    this.setState({
      loggedIn: false
    });
  };
  updateInput = (e, key) => {
    if (key === "Username") {
      this.setState({
        Username: e.target.value
      });
    } else {
      this.setState({
        Password: e.target.value
      });
    }
  };
  render() {
    return this.state.loggedIn ? (
      <App
        path={this.path}
        api={this.api}
        routes={this.routes}
        logOut={this.logOut}
      />
    ) : (
      <Login
        Username={this.state.Username}
        Password={this.state.Password}
        updateInput={this.updateInput}
        login={this.login}
        error={this.state.error}
      />
    );
  }
}
