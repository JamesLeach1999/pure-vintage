import React, { useState, useEffect, Component } from "react";
// import { Link } from "react-router-dom";
import { Brow1serRouter as Router, Route, Switch, Link } from "react-router-dom";

import Axios from "axios";
import Welcome from "./Welcome";
import Home from "../pages/Home";
import Store from "../pages/Store";
import Product from "./ProductPage";
import Cart from "./Cart";
import Login from "./Login";
import Me from "../pages/Me";
import Order from "../pageStripe/index";
import Manage from "../pages/Manage";
import Add from "../pages/Add";
import Edit from "./EditPage";
import PastOrders from "../pages/Past";
import OrderProducts from "../pages/OrderPage";
import RefundProducts from "../pages/RefundPage";
import { Button1 } from "./Button";
import Register from "./Register";
import "../css/Navbar.css";
import CartSlide from "./CartSlide";
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
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  // handleClick = () => {
  //   this.setState({ clicked: !this.state.clicked });
  // };

  async handleLogin(data) {
    console.log("ibdeibceuyibvhkub bhkjfv chksjev hdsjkvhksdffv");
    if (data) {
      console.log("thats numberwangssss");
      const work = await Axios.post("/getAuth", {
        id: data.user,
      });
      console.log(work);
      this.setState({
        loggedIn: "Logged in",
        auth: true,
        admin: work.data.isAdmin,
      });
      console.log(work.data);
      sessionStorage.setItem("auth", true);
      sessionStorage.setItem("admin", work.data.isAdmin);
      sessionStorage.setItem("user", work.data.id);
      console.log(sessionStorage);
    }

    if (!data) {
      // sessionStorage.setItem("auth", false);
      // sessionStorage.setItem("admin", false);
      window.location.replace("/store");
    }
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
      console.log("thats wangernumb");

      console.log(this.node);

      return;
    }

    this.handleClick();
  }

  render() {
    return (
      <Router>
        <nav
          className="NavbarItems"
          ref={(node) => (this.node = node)}
          style={{ width: "100%" }}
        >
          <img
            src="https://res.cloudinary.com/dhey8vvcx/image/upload/c_thumb,w_200,g_face/v1608123578/frontphone33_j5olug.jpg"
            alt=""
            style={{ zIndex: "-1", width: "60px", height: "60px" }}
          />
          <CartSlide style={{ position: "fixed" }} />
          <div className="menu-icon" onClick={this.handleClick}>
            <i
              style={{ color: "black" }}
              className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
            ></i>
          </div>
          <ul
            id="MenuItems"
            className={this.state.clicked ? "nav-menu active" : "nav-menu"}
          >
            <Link to="/">
              <li className="nav-links">Home</li>
            </Link>
            <Link to="/store">
              <li className="nav-links">Store</li>
            </Link>
            {sessionStorage.getItem("auth") === "true" ? (
              <li className="nav-links">
                <Link to="/cart">Cart</Link>
              </li>
            ) : (
              ""
            )}

            {sessionStorage.getItem("auth") === "true" ? (
              <li className="nav-links">
                <Link to="/me">My past orders</Link>
              </li>
            ) : (
              ""
            )}
            {sessionStorage.getItem("admin") === "true" ? (
              <li className="nav-links">
                <Link to="/manage">Manage</Link>
              </li>
            ) : (
              ""
            )}
            <li className="nav-links">
              {sessionStorage.getItem("auth") === "false" ||
              !sessionStorage.getItem("auth") ? (
                <Link to="/login">Login</Link>
              ) : (
                <Link to="/login">Logout?</Link>
              )}
            </li>
          </ul>
        </nav>

        {/* <img src={defaultImage} alt="" width="30px" height="30px" />
              <button onClick={this.errorToggle}>
                <img src="assets/shoes1.jpg" alt="" class="menu-icon" />
              </button> */}
        {/* </div>
          </div>
        </div> */}
        <Switch>
          {/* <Route path={"/"} render={(props) => (
            <Nav {...props} handleLogin={this.handleLogin} user={this.state.user} />
            )}>
            </Route> */}
          <Route exact path={"/"}>
            <Welcome />
            <Home />
          </Route>
          <Route path="/store">
            <Store />
            {/* <Welcome />
            <Home /> */}
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route
            path={"/login"}
            render={(props) => (
              <Login
                {...props}
                handleLogin={this.handleLogin}
                loggedIn={this.state.loggedIn}
              />
            )}
          ></Route>
          <Route path="/me">
            <Me />
          </Route>
          <Route
            path={"/register"}
            render={(props) => (
              <Register
                {...props}
                handleLogin={this.handleLogin}
                loggedIn={this.state.loggedIn}
              />
            )}
          ></Route>

          <Route path="/manage">
            <Manage />
          </Route>
          <Route path="/allOrders">
            <PastOrders />
          </Route>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/orderProducts/:id">
            <OrderProducts />
          </Route>

          <Route path="/edit/:id" children={<Edit />}></Route>
          <Route path="/order" children={<Order />}></Route>
          <Route
            path="/refundProducts/:id"
            children={<RefundProducts />}
          ></Route>

          <Route path="/product/:id" children={<Product />}></Route>
        </Switch>
      </Router>
    );
  }
}
