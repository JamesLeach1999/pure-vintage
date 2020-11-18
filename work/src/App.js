import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, {useState, useEffect, Component} from "react"

import "./App.css";
// import "./index.css";

// import Footer from "./components/Footer"
import Nav from "./components/Nav";
import Welcome from './components/Welcome';
import Home from './pages/Home';
import Store from './pages/Store';
import Product from './components/ProductPage';
import Cart from './components/Cart';
import Login from './components/Login';
import Filter from './components/Filter';
import Me from './pages/Me';
import Order from './pageStripe/index';
import Manage from './pages/Manage';
import Add from './pages/Add';
import Edit from './components/EditPage';
import auth from './components/OrderSum';
import PastOrders from './pages/Past';
import OrderProducts from './pages/OrderPage';
import RefundProducts from './pages/RefundPage';

export default class App extends Component {

  constructor(){
    super()

    this.state = {
      loggedIn: "NOT_LOGGED_IN",
      user:{}
    }
// updating state
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(data){
    this.setState({
      loggedIn: "Logged in",
      user: {data},
    })
  }

  render(){

    return (
      <Router>
        {/* render you can pass in and call it directly, can add additional props */}
        <div className="App">
          <Nav/>
            </div>
      </Router>
    );
  }
  
}

