import React, { useState } from "react";
// import "./App.css";
import Axios from "axios";
import "../css/Login.css"
const App = (props) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
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
      console.log(res);
      if (res.data) {
        props.handleLogin(res.data.passport);
        setLoginUsername(registerUsername);
        setLoginPassword(registerPassword);
        console.log(loginUsername);
        login();
      } else {
        props.handleLogin(false);
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
    }).then((res) => {
      if (res.data) {
        console.log(res.data);
        props.handleLogin(res.data.passport);
        if (sessionStorage.getItem("user")) {
          console.log("numberwang login");
          // window.location.replace("/store");
        }
      } else {
        props.handleLogin(false);
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
      <div id="formContent">
        <div class="fadeIn first">
          <img
            src="http://danielzawadzki.com/codepen/01/icon.svg"
            id="icon"
            alt="User Icon"
          />
        </div>

        <form>
          <input
            type="text"
            id="login"
            class="fadeIn second"
            name="login"
            placeholder="login"
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="text"
            id="password"
            class="fadeIn third"
            name="login"
            placeholder="password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button
            type="submit"
            class="fadeIn fourth"
            value="Log In"
            onClick={login}
          />
        </form>
      </div>
    </div>
  );
};

export default App;
