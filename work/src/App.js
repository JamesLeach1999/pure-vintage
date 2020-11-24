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
          <Switch>
            {/* <Route path={"/"} render={(props) => (
            <Nav {...props} handleLogin={this.handleLogin} user={this.state.user} />
            )}>
            </Route> */}
            <Route exact path={"/"}>
              <Welcome />
              <Home />
            </Route>
            <Route path="/store"><Store/></Route>
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

            <Route path="/edit/:id" children={<Edit />}></Route>
            <Route path="/order" children={<Order />}></Route>
            <Route
              path="/orderProducts/:id"
              children={<OrderProducts />}
            ></Route>
            <Route
              path="/refundProducts/:id"
              children={<RefundProducts />}
            ></Route>
            <Route path="/product/:id" children={<Product />}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
}

