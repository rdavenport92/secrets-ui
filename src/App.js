import React, { Component } from "react";
import io from "socket.io-client";
import SecretsSearch from "./Components/SecretsSearch/SecretsSearch";
import Home from "./Components/Home/Home";
import SettingsIcon from "./Components/SettingsIcon/SettingsIcon";
import MenuIcon from "./Components/MenuIcon/MenuIcon";
import EditSecret from "./Components/EditSecret/EditSecret";
import FilterSecrets from "./Components/FilterSecrets/FilterSecrets";
import Settings from "./Components/Settings/Settings";
import NavMenu from "./Components/NavMenu/NavMenu";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageToDisplay: "home",
      secrets: [],
      secretSearchValue: "",
      hideMenu: true,
      bodyHeight: "",
      secretToEdit: {
        _id: "",
        unalteredName: "",
        Name: "",
        Secret: "",
        Description: ""
      }
    };
    this.path = "http://localhost:3020";
    this.api = `${this.path}/api/`;
    this.socket = io(this.path);
    this.routes = ["secrets"];
    this.bodyRef = React.createRef();
  }

  componentDidMount = () => {
    this.socket.on("update secret", newSecret => {
      let secrets = [...this.state.secrets];
      for (let oldSecret in secrets) {
        if (secrets[oldSecret]._id === newSecret._id) {
          secrets[oldSecret] = newSecret;
          console.log(secrets);
          this.setState({
            secrets
          });
          break;
        }
      }
    });
    this.socket.on("new secret", newSecret => {
      let secrets = [...this.state.secrets];
      secrets.push(newSecret);
      this.setState({
        secrets
      });
    });
    window.addEventListener("resize", this.updateHeight);
    fetch(`${this.api}${this.routes[0]}`).then(res => {
      res.json().then(secrets => {
        this.setState({
          secrets,
          bodyHeight: `${this.bodyRef.current.clientHeight}px`
        });
      });
    });
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateHeight);
  };

  updateHeight = () => {
    this.setState({
      bodyHeight: `${this.bodyRef.current.clientHeight}px`
    });
  };

  focusInput = () => {
    this.setState({
      hideMenu: true,
      pageToDisplay: "filter"
    });
  };

  hidingMenu = () => {
    this.setState({
      hideMenu: !this.state.hideMenu
    });
  };

  goHome = () => {
    this.setState({
      hideMenu: true,
      pageToDisplay: "home",
      secretSearchValue: ""
    });
  };

  newSecret = () => {
    let secretToEdit = {
      _id: null,
      Name: "",
      unalteredName: "New Secret",
      Secret: "",
      Description: "",
      New: true
    };
    this.setState({
      hideMenu: true,
      pageToDisplay: "new",
      secretSearchValue: "",
      secretToEdit
    });
  };

  editSecret = _id => {
    let secret = [...this.state.secrets].filter(
      secret => secret._id === _id
    )[0];
    let secretToEdit = {
      _id: secret._id,
      Name: secret.Name,
      unalteredName: secret.Name,
      Secret: secret.Secret,
      Description: secret.Description,
      New: false
    };
    this.setState({
      hideMenu: true,
      pageToDisplay: "edit",
      secretToEdit,
      secretSearchValue: ""
    });
  };

  updateSecretState = e => {
    let secretSearchValue = e.target.value;
    this.setState({
      secretSearchValue
    });
  };

  renderSettings = () => {
    this.setState({
      hideMenu: true,
      pageToDisplay: "settings",
      secretSearchValue: ""
    });
  };

  updateSecret = (e, key) => {
    let secretToEdit = { ...this.state.secretToEdit };
    secretToEdit[key] = e.target.value;
    this.setState({
      secretToEdit
    });
  };
  handleEditedSecretStart = () => {
    //ensure all fields are filled out
    let secretToEdit = { ...this.state.secretToEdit };
    for (let field in secretToEdit) {
      if (field === "Name" || field === "Secret" || field === "Description") {
        if (secretToEdit[field] === "") {
          secretToEdit.error = "Please fill out all fields before proceeding!";
          this.setState({
            secretToEdit
          });
          return;
        }
      }
    }
    //passed initial error checking
    //handle post and potentially errors from server
    if (secretToEdit.New) {
      this.handleNewSecret(secretToEdit);
    } else {
      this.handleEditSecret(secretToEdit);
    }
  };

  handleNewSecret = secretToEdit => {
    fetch(`${this.api}${this.routes[0]}`, {
      method: "POST",

      body: JSON.stringify({
        Name: secretToEdit.Name,
        Secret: secretToEdit.Secret,
        Description: secretToEdit.Description
      }),
      headers: { "Content-Type": "application/json" }
    }).then(res =>
      res.json().then(json => {
        if (!json._id) {
          secretToEdit.error = `Unable to create secret due to: ${json.name}`;
          secretToEdit.success = "";
          this.setState({
            secretToEdit
          });
        } else {
          secretToEdit.success = `Successfully created! The secret id is: ${
            json._id
          }`;
          secretToEdit.error = "";
          secretToEdit.Name = "";
          secretToEdit.Secret = "";
          secretToEdit.Description = "";
          this.setState({
            secretToEdit
          });
        }
      })
    );
  };

  handleEditSecret = secretToEdit => {
    //need to check if changes were even made first
    let { Name, Secret, Description } = secretToEdit;
    fetch(`${this.api}${this.routes[0]}/${secretToEdit._id}`, {
      method: "PUT",
      body: JSON.stringify({
        Name,
        Secret,
        Description
      }),
      headers: { "Content-Type": "application/json" }
    }).then(res =>
      res.json().then(json => {
        if (!json._id) {
          secretToEdit.error = `Unable to update secret due to: ${json.name}`;
          secretToEdit.success = "";
          this.setState({
            secretToEdit
          });
        } else {
          secretToEdit.success = `Successfully updated! The secret id is: ${
            json._id
          }`;
          secretToEdit.error = "";
          this.setState({
            secretToEdit
          });
        }
      })
    );
  };

  render() {
    return (
      <div className="root-container">
        <div className="header-container bg-dark">
          <div className="header-left">
            <div className="header-menu-icon-container">
              <div className="header-menu-icon-sizable">
                {" "}
                <MenuIcon hidingMenu={this.hidingMenu} />
              </div>
            </div>
            <div className="header-main">
              <h2 className="header" onClick={this.goHome}>
                Secrets
              </h2>
            </div>
          </div>
          <div className="header-right">
            <div className="header-dropdown-container-parent">
              <SecretsSearch
                secretSearchValue={this.state.secretSearchValue}
                updateSecretState={this.updateSecretState}
                focusInput={this.focusInput}
              />
            </div>
            <div className="header-settings-container">
              <div className="header-settings-sizable">
                <SettingsIcon renderSettings={this.renderSettings} />
              </div>
            </div>
          </div>
        </div>
        <div className="body-container" ref={this.bodyRef}>
          <NavMenu
            secrets={this.state.secrets}
            hideMenu={this.state.hideMenu}
            bodyHeight={this.state.bodyHeight}
            newSecret={this.newSecret}
            editSecret={this.editSecret}
          />
          <div className="body-main-container">
            {this.state.pageToDisplay === "home" ? (
              <Home
                renderSettings={this.renderSettings}
                hidingMenu={this.hidingMenu}
              />
            ) : this.state.pageToDisplay === "edit" ||
              this.state.pageToDisplay === "new" ? (
              <EditSecret
                secrets={this.state.secrets}
                secretToEdit={this.state.secretToEdit}
                updateSecret={this.updateSecret}
                handleEditedSecretStart={this.handleEditedSecretStart}
              />
            ) : this.state.pageToDisplay === "filter" ? (
              <FilterSecrets
                secrets={this.state.secrets}
                secretSearchValue={this.state.secretSearchValue}
                editSecret={this.editSecret}
              />
            ) : (
              <Settings />
            )}
          </div>
        </div>
      </div>
    );
  }
}
