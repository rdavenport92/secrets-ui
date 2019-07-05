import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Copy.css";
import copy from "../../assets/copy.png";
import checkMark from "../../assets/checkMark.png";

export default class Copy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  copy = () => {
    this.setState({
      copied: true
    });
    this.timerHandle();
  };

  timerHandle = () => {
    setTimeout(() => {
      this.setState({
        copied: false
      });
    }, 1500);
  };

  componentWillUnmount = () => {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
    }
  };

  render() {
    return (
      <CopyToClipboard text={`"${this.props._id}"`} onCopy={this.copy}>
        <img
          className="copy-img"
          style={this.state.copied ? { opacity: "1" } : null}
          src={this.state.copied ? checkMark : copy}
        />
      </CopyToClipboard>
    );
  }
}
