import React, { useState, useEffect, Component, useRef } from "react";
// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

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
const Nav = () => {
  var [loggedIn, setLoggedIn] = useState("NOT_LOGGED_IN")
  var [user, setUser] = useState({})
    var [admin, setAdmin] = useState(false)
  var [auth, setAuth] = useState(false)
  var [clicked, setClicked] = useState(false)
  var [cartClicked, setCartClicked] = useState(false)
  var [data, setData] = useState([])
  var refContainer = useRef(null)
  // constructor() {
  //   super();

  //   this.state = {
  //     loggedIn: "NOT_LOGGED_IN",
  //     user: {},
  //     admin: false,
  //     auth: false,
  //     clicked: false,
  //     cartClicked: false,
  //     data: [],
  //   };
  //   // updating state
  //   this.handleLogin = this.handleLogin.bind(this);
  //   this.handleClick = this.handleClick.bind(this);
  //   this.handleOutsideClick = this.handleOutsideClick.bind(this);
  //   this.logout = this.logout.bind(this);
  // }

  // handleClick = () => {
  //   this.setState({ clicked: !this.state.clicked });
  // };

  var handleLogin = async(data) => {
    if (data) {
      console.log("thats numberwangssss");
      const work = await Axios.post("/getAuth", {
        id: data.user,
      });
      console.log(work);
      // this.setState({
      //   loggedIn: "Logged in",
      //   auth: true,
      //   admin: work.data.isAdmin,
      // });
      setLoggedIn("Logged in")
      setAuth(true)
      setAdmin(work.data.isAdmin)
      console.log(work.data);
      sessionStorage.setItem("auth", true);
      sessionStorage.setItem("admin", work.data.isAdmin);
      sessionStorage.setItem("user", work.data.id);
      console.log(sessionStorage);
    }

    if (!data) {
      // sessionStorage.setItem("auth", false);
      // sessionStorage.setItem("admin", false);
      alert("Email or password incorrect")
    }
  }

  var handleClick = () => {
    if (!clicked) {
      // attach/remove event handler
      console.log("c");
      document.addEventListener("click", handleOutsideClick, false);
    } else {
      console.log("l");

      document.removeEventListener("click", handleOutsideClick, false);
    }

    
    setClicked(!clicked)
  }

  var handleOutsideClick = (e) => {
    // ignore clicks on the component itself
    console.log(refContainer.current.children.contains(e.target));
    console.log(e.target)
    if (refContainer.current.children.contains(e.target)) {
      console.log("thats wangernumb");

      console.log(this.node);

      return;
    }

    handleClick();
  }

  var logout = () => {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("user");

    // window.location.replace("/store");
  }

    return (
      <Router>
        <nav
          className="NavbarItems"
          ref={refContainer}
          style={{ color: "black", backgroundColor: "white" }}
        >
          <img
            src="https://res.cloudinary.com/dhey8vvcx/image/upload/v1611415440/logo_blue_k8rcyp.png"
            alt=""
            style={{ zIndex: "-1", width: "60px"}}
          />
          <CartSlide style={{ position: "fixed" }} />
          <div className="menu-icon" onClick={handleClick}>
            <i
              style={{ color: "black", width: "75px", height: "75px" }}
              className={clicked ? "fas fa-times" : "fas fa-bars"}
            ></i>
          </div>
          <ul
            id="MenuItems"
            className={clicked ? "nav-menu active" : "nav-menu"}
          >
            <Link to="/">
              <li className="nav-links">Home</li>
            </Link>
            <Link to="/store">
              <li className="nav-links">Store</li>
            </Link>

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
                <li>
                  <form>
                    <button
                      type="submit"
                      className="nav-links"
                      value="Log In"
                      style={{
                        display: "inline-block",
                        paddingTop: "5px",
                        color: "black",
                        height: "70px",
                        position: "relative",
                        top: "-25px",
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </form>
                </li>
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
                handleLogin={handleLogin}
                loggedIn={loggedIn}
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
                handleLogin={handleLogin}
                loggedIn={loggedIn}
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

export default Nav