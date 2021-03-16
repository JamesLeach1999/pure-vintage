import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect, Component } from "react";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-json-server";
import ProductList from "./pages/admin/ProductList";
import "./App.css";
// import "./index.css";

// import Footer from "./components/Footer"
import Nav from "./components/Nav";
import Footer from "./components/Footer";
const dataProvider = restProvider(
  "https://cryptic-temple-54361.herokuapp.com/"
);
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
          <Admin dataProvider={dataProvider}>
            <Resource name="store1" list={ProductList} />
          </Admin>
          <Footer />
        </div>
      </Router>
    );
  }
}
