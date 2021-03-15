import React, { useState } from "react";
// import "./App.css";
import Axios from "axios";
import "../css/Login.css";
import { Link } from "react-router-dom";
import { session } from "passport";
const App = (props) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  var [err, setErr] = useState(false);
  const register = () => {
    Axios({
      method: "POST",
      data: {
        name: registerName,
        email: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "/register",
    }).then((res) => {
      if (res.data) {
        props.handleLogin(res.data.passport);
        setLoginUsername(registerUsername);
        setLoginPassword(registerPassword);
        login();
      } else {
        props.handleLogin(false);
        setErr(true);
      }
      // window.location.replace("/store");
    });
  };
  const login = () => {
    Axios({
      method: "POST",
      data: {
        email: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,

      url: "/login",
    })
      .then((res) => {
        if (res.data) {
          props.handleLogin(res.data.passport);
          setErr(false);

          // window.location.replace("/store");
        } else {
          props.handleLogin(false);
          setErr(true);
        }
      })
      .then((r) => {
        if (sessionStorage.getItem("auth")) {
          window.location.replace("/store");
        }
      });
  };

  const logout = async () => {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("user");

    // window.location.replace("/store");
  };

  return (
    <div className="wrapper fadeInDown">
      <br /> <br />
      <br /> <br /> <br /> <br /> <br /> <br />
      <div class="fadeIn first">
        <div id="formContent">
          <br />
          <input
            type="text"
            id="login"
            class="fadeIn second"
            name="login"
            placeholder="login"
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            class="fadeIn third"
            name="login"
            placeholder="password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <br />
          <br />
          <button
            type="submit"
            className="fadeIn fourth myButton"
            style={{ borderRadius: "5%", padding: "8px", border: "none" }}
            value="Log In"
            onClick={login}
          >
            Log in
          </button>
          <br />
          <br />
        </div>
      </div>
      <br />
      <Link to="/register">
        <button
          style={{ borderRadius: "5%", padding: "8px", border: "none" }}
          className="myButton"
        >
          Create Account
        </button>
      </Link>
    </div>
  );
};

export default App;
