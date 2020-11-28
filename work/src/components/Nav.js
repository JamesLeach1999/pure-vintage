import React, { useState, useEffect, Component } from 'react';
// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Axios from 'axios';
import Welcome from './Welcome';
import Home from '../pages/Home';
import Store from '../pages/Store';
import Product from './ProductPage';
import Cart from './Cart';
import Login from './Login';
import Me from '../pages/Me';
import Order from '../pageStripe/index';
import Manage from '../pages/Manage';
import Add from '../pages/Add';
import Edit from './EditPage';
import PastOrders from '../pages/Past';
import OrderProducts from '../pages/OrderPage';
import RefundProducts from '../pages/RefundPage';


// have to use links like this in the nav
export default class Nav extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: "NOT_LOGGED_IN",
      user: {},
      admin: false,
      auth: false,
    };
    // updating state
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin(data) {
    console.log(data);
    if (data) {
      console.log("thats numberwang");
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
      localStorage.setItem("auth", true);
      localStorage.setItem("admin", work.data.isAdmin);
      localStorage.setItem("user", work.data.id);
      console.log(localStorage);
    }

    if (!data) {
      // localStorage.setItem("auth", false);
      // localStorage.setItem("admin", false);
      window.location.replace("/store");
    }
  }

  // errorToggle () {
  //   // this.setState({error: false})
  //   var menuItems = document.getElementById('MenuItems');
  //   menuItems.style.maxHeight = '0px';
  //   // setError(true)
  //   if ((this === undefined || this.state.error) === undefined) {
  //     console.log('thats numbereang');
  //     this.setState({ error: true });
  //     menuItems.style.maxHeight = '0px';
  //   } else {
  //     menuItems.style.maxHeight = '200px';
  //     menuItems.style.maxWidth = '500px';
  //     menuItems.style.textAlign = 'right';
  //     this.setState({ error: false });
  //     console.log('thats numbereang');
  //   }
  // };

  doSomethingBeforeUnload = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
  };

  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return this.doSomethingBeforeUnload();
    });
  };

  async componentDidMount() {
    this.setupBeforeUnloadListener();
  }

  render() {
    return (
      <Router>
        <div className="header">
          <div class="container" style={{ color: "white" }}>
            <div class="navbar">
              <div class="logo">
                <img
                  src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1606404113/logo_blue_zqlccw.png"
                  alt="logo"
                  width="125px"
                />
              </div>
              <nav>
                <ul id="MenuItems">
                  <li>
                    <Link to="/">home</Link>
                  </li>
                  <li>
                    <Link to="/store">store</Link>
                  </li>
                  {localStorage.getItem("auth") === "true" ? (
                    <li>
                      <Link to="/cart">cart</Link>
                    </li>
                  ) : (
                    ""
                  )}

                  {localStorage.getItem("auth") === "false" ? (
                    <li>
                      <Link to="/login">login</Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/login">Logout?</Link>
                    </li>
                  )}
                  {localStorage.getItem("auth") === "true" ? (
                    <li>
                      <Link to="/me">me</Link>
                    </li>
                  ) : (
                    ""
                  )}
                  {localStorage.getItem("admin") === "true" ? (
                    <li>
                      <Link to="/manage">manage</Link>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </nav>

              {/* <img src={defaultImage} alt="" width="30px" height="30px" />
              <button onClick={this.errorToggle}>
                <img src="assets/shoes1.jpg" alt="" class="menu-icon" />
              </button> */}
            </div>
          </div>
        </div>
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
