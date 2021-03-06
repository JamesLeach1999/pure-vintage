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
  const [error, setError] = useState(false);
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
    })
      .then((res) => {
        if (res.data) {
          props.handleLogin(res.data.passport);

          setLoginUsername(registerUsername);
          setLoginPassword(registerPassword);
          setError(false)
          // login();
        } else {
          props.handleLogin(false);
          setError(true)
          throw new Error("email taken")
        }
        // window.location.replace("/store");
      })
      .then((u) => {
        if(error){
          window.location.replace("/register")
        } else {
          window.location.replace("/store");

        }
      })
  };
  return (
    <div className="wrapper fadeInDown">
      <br /> <br />
      <br /> <br /> <br /> <br /> <br /> <br />
      <div id="formContent">
        <div class="fadeIn first">
          <form>
            <br />
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
            <br />
            <br />
            <button
              type="submit"
              class="fadeIn fourth myButton"
              value="Log In"
              onClick={register}
            >
              Create account
            </button>
            {error ? (
              <div class="alert">
                <span
                  class="closebtn"
                  onClick={(this.parentElement.style.display = "none")}
                >
                  &times;
                </span>
                <strong>Danger!</strong> Indicates a dangerous or potentially
                negative action.
              </div>
            ) : (
              ""
            )}

            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
