import React, { useState } from "react";
// import "./App.css";
import Axios from "axios";
import "../css/Login.css";
import { Link } from "react-router-dom";
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
        // login();
      } else {
        props.handleLogin(false);
      }
      // window.location.replace("/store");
    }).then((u) =>{
        window.location.replace("/store")
    });
  };

//   const login = () => {
//     Axios({
//       method: "POST",
//       data: {
//         email: loginUsername,
//         password: loginPassword,
//       },
//       withCredentials: true,

//       url: "/login",
//     }).then((res) => {
//       if (res.data) {
//         console.log(res.data);
//         props.handleLogin(res.data.passport);

//         window.location.replace("/store");
//       } else {
//         props.handleLogin(false);
//       }
//     });
//   };
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
          name="name"
          placeholder="Name"
          onChange={(e) => setRegisterName(e.target.value)}
        />

        <input
          type="text"
          id="login"
          class="fadeIn second"
          name="email"
          placeholder="Email"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          type="text"
          id="password"
          class="fadeIn third"
          name="password"
          placeholder="Password"
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
