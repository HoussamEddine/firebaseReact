import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../../config";

import Login from "./Login";

class LoginContainer extends Component {
  handleLogin = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const user = await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <Login onSubmit={this.handleLogin} />;
    
  }
}

export default withRouter(LoginContainer);
