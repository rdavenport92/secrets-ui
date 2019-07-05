import React, { Component } from "react";
import SecretsSearch from "./Components/SecretsSearch/SecretsSearch";
import Home from "./Components/Home/Home";
import SettingsIcon from "./Components/SettingsIcon/SettingsIcon";
import MenuIcon from "./Components/MenuIcon/MenuIcon";
import EditSecret from "./Components/EditSecret/EditSecret";
import NewSecret from "./Components/NewSecret/NewSecret";
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
        Name: "",
        Secret: "",
        Description: ""
      }
    };
    this.api = "http://localhost:3020/api/";
    this.routes = ["secrets"];
    this.bodyRef = React.createRef();
  }

  componentDidMount = () => {
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
    this.setState({
      hideMenu: true,
      pageToDisplay: "new",
      secretSearchValue: ""
    });
  };

  editSecret = _id => {
    let secret = [...this.state.secrets].filter(
      secret => secret._id === _id
    )[0];
    let secretToEdit = {
      _id: secret._id,
      Name: secret.Name,
      Secret: secret.Secret,
      Description: secret.Description
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
            ) : this.state.pageToDisplay === "edit" ? (
              <EditSecret
                secretToEdit={this.state.secretToEdit}
                updateSecret={this.updateSecret}
              />
            ) : this.state.pageToDisplay === "new" ? (
              <NewSecret />
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
