import React from "react";
import { Form, Input, Button } from "reactstrap";
import "./Login.css";

const Login = ({ Username, Password, updateInput, login, error }) => {
  return (
    <div className="login-container">
      <table className="login-table">
        <tbody>
          <tr>
            <td>
              <div className="login-header">Please log in to continue</div>
            </td>
          </tr>
          <tr>
            <td>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  login();
                }}
              >
                <Input
                  value={Username}
                  onChange={e => updateInput(e, "Username")}
                  placeholder="Username"
                />
              </Form>
            </td>
          </tr>
          <tr>
            <td>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  login();
                }}
              >
                <Input
                  type="password"
                  value={Password}
                  onChange={e => updateInput(e, "Password")}
                  placeholder="Password"
                />
              </Form>
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <div className="login-button">
                {" "}
                <Button className="btn-info" onClick={login}>
                  Log In
                </Button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="login-errors">{error}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Login;
