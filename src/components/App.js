import React, { Component } from "react";
import postLogin from "../api/postLoginApi";
import getLogout from "../api/logoutApi";
import postRegister from "../api/postRegisterApi";
var Cookies = require("cookies-js");
export default class componentName extends Component {
  componentDidMount = () => {};
  login = () => {
    postLogin().then((resp, err) => {
      console.log(resp);

      if (resp == undefined) return;
      Cookies.set("userid", resp._id, {
        domain: "localhost",
        secure: false
      });
    });
  };

  logout = () => {
    getLogout().then((resp) => {
      console.log(resp);
      Cookies.expire("userid").get("userid");
    });
  };

  register = () => {
    postRegister().then((resp) => {
      console.log(resp);
    });
  };

  render() {
    return (
      <div>
        <p>starter template</p>
        <button onClick={this.register}>register</button>
        <button onClick={this.login}> login </button>
        <button onClick={this.logout}> logout </button>
      </div>
    );
  }
}
