import React, { useState, useEffect } from "react";
import Axios from "axios";

const Register = (props) => {
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
  return (
    <div className="wrapper fadeInDown">
      <br /> <br />
      <br /> <br /> <br /> <br /> <br /> <br />
      <div id="formContent">
        <div class="fadeIn first"></div>
        <br/>
        <input
          type="text"
          id="login"
          class="fadeIn second"
          name="login"
          placeholder="login"
          onChange={(e) => setRegisterName(e.target.value)}
        />

        <input
          type="text"
          id="login"
          class="fadeIn second"
          name="email"
          placeholder="email"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          type="text"
          id="password"
          class="fadeIn third"
          name="password"
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <br/><br/>
        <button
          type="submit"
          class="fadeIn fourth myButton"
          value="Log In"
          onClick={register}
        >
          Create account
        </button>
        <br/><br/>
      </div>
    </div>
  );
};

export default Register;
