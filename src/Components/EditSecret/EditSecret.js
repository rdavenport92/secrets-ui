import React, { Component } from "react";
import { Label, Input, Button } from "reactstrap";
import hide from "../../assets/hide.png";
import "./EditSecret.css";

export default class EditSecret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePassword: true
    };
  }
  render() {
    return (
      <div className="edit-secret-container">
        <table className="edit-secret-table">
          <thead>
            <tr>
              <th colSpan={2}>
                <div className="secret-form-header">
                  <h4>
                    {this.props.secretToEdit._id
                      ? this.props.secrets.filter(
                          secret => secret._id === this.props.secretToEdit._id
                        )[0].Name
                      : "New Secret"}
                  </h4>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="secret-label">
                  <Label>Name: </Label>
                </div>
              </td>
              <td>
                <Input
                  value={this.props.secretToEdit.Name}
                  onChange={e => this.props.updateSecret(e, "Name")}
                  placeholder="Enter a name for this secret"
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className="secret-label">
                  <Label>Secret: </Label>
                </div>
              </td>
              <td>
                <div className="secret-input-container">
                  <Input
                    type={this.state.hidePassword ? "password" : "text"}
                    value={this.props.secretToEdit.Secret}
                    onChange={e => this.props.updateSecret(e, "Secret")}
                    placeholder="Enter the secret"
                  />
                  <img
                    style={!this.state.hidePassword ? { opacity: ".2" } : null}
                    onClick={() =>
                      this.setState({ hidePassword: !this.state.hidePassword })
                    }
                    className="secret-eye"
                    src={hide}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="secret-label">
                  <Label>Description: </Label>
                </div>
              </td>
              <td>
                <Input
                  type="textarea"
                  value={this.props.secretToEdit.Description}
                  onChange={e => this.props.updateSecret(e, "Description")}
                  placeholder="Enter a description for the secret"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="secret-button-container">
                  <Button
                    className="btn-success"
                    onClick={this.props.handleEditedSecretStart}
                  >
                    {this.props.secretToEdit.New
                      ? "Create New"
                      : "Save Changes"}
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="secret-message-display">
                  <div className="secret-message-error">
                    {this.props.secretToEdit.error}
                  </div>
                  <div className="secret-message-success">
                    {this.props.secretToEdit.success}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
