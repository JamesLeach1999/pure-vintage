import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect, Component } from "react";

import "./App.css";
// import "./index.css";

// import Footer from "./components/Footer"
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: "NOT_LOGGED_IN",
      user: {},
    };
    // updating state
    this.handleLogin = this.handleLogin.bind(this);
  }

  

  handleLogin(data) {
    this.setState({
      loggedIn: "Logged in",
      user: { data },
    });
    console.log(this.state.user);
  }

  render() {
    return (
      <Router>
        {/* render you can pass in and call it directly, can add additional props */}
        <div className="App">
          <Nav />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <Footer />
        </div>
      </Router>
    );
  }
}
