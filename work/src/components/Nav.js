import React, { useState, useEffect, Component } from 'react';
// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Axios from 'axios';
import defaultImage from "../assets/Logo_blue_text.jpg";
import Welcome from './Welcome';
import Home from '../pages/Home';
import Store from '../pages/Store';
import Product from './ProductPage';
import Cart from './Cart';
import Login from './Login';
import Filter from './Filter';
import Me from '../pages/Me';
import Order from '../pageStripe/index';
import Manage from '../pages/Manage';
import Add from '../pages/Add';
import Edit from './EditPage';
import auth from './OrderSum';
import PastOrders from '../pages/Past';
import OrderProducts from '../pages/OrderPage';
import RefundProducts from '../pages/RefundPage';
import GetAuth from './GetAuth';

// have to use links like this in the nav
export default class Nav extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: 'NOT_LOGGED_IN',
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
      console.log("thats numberwang")
      const work = await Axios.post('/getAuth', {
        id: data.user,
      });
      console.log(work);
      this.setState({
        loggedIn: 'Logged in',
        auth: true,
        admin: work.data.isAdmin
      });
    }
    if(!data){
      window.location.replace("/store")
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
  async componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="header">
          <div class="container">
            <div class="navbar">
              <div class="logo">
                <img src={defaultImage} alt="logo" width="125px" />
              </div>
              <nav>
                <ul id="MenuItems">
                  <li>
                    <Link to="/">home</Link>
                  </li>
                  <li>
                    <Link to="/store">store</Link>
                  </li>
                  {this.state.auth !== false ? (
                    <li>
                      <Link to="/cart">cart</Link>
                    </li>
                  ) : (
                    ""
                  )}

                  {this.state.auth === false ? (
                    <li>
                      <Link to="/login">login</Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/login">Logout?</Link>
                    </li>
                  )}
                  {this.state.auth !== false ? (
                    <li>
                      <Link to="/me">me</Link>
                    </li>
                  ) : (
                    ""
                  )}
                  {this.state.admin !== false ? (
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
        
      </Router>
    );
  }
}
