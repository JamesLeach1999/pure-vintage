import React, { useState, useEffect, Component } from "react";
// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// import Axios from "axios";
// import Welcome from "./Welcome";
// import Home from "../pages/Home";
// import Store from "../pages/Store";
// import Product from "./ProductPage";
// import Cart from "./Cart";
// import Login from "../components/Login";
// import Me from "../pages/Me";
// import Order from "../pageStripe/index";
// import Manage from "../pages/Manage";
// import Add from "../pages/Add";
// import Edit from "../components/EditPage";
// import PastOrders from "../pages/Past";
// import OrderProducts from "../pages/OrderPage";
// import RefundProducts from "../pages/RefundPage";
// import { Button1 } from "../components/Button";
// import Register from "../components/Register";
import StoreRows from "../components/Test";
import "../css/Cart.css";
import CartSlide from "../components/Filter";
// have to use links like this in the nav
export default class Nav extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: "NOT_LOGGED_IN",
      user: {},
      admin: false,
      auth: false,
      clicked: false,
      cartClicked: false,
      data: [],
    };
    // updating state
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleClick() {
    if (!this.state.clicked) {
      // attach/remove event handler
      console.log("c");
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      console.log("l");

      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState((prevState) => ({
      clicked: !prevState.clicked,
    }));
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  }

  render() {
    return (
      <div>
        <CartSlide style={{ position: "fixed" }} />
      </div>
    );
  }
}
