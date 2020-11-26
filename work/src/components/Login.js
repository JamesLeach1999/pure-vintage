import React, { useState } from "react";
// import "./App.css";
import Axios from "axios";
import auth from "./OrderSum";

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
      } else {
        props.handleLogin(false);
      }
      window.location.replace("/store");
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
        props.handleLogin(res.data.passport);
      } else {
        props.handleLogin(false);
      }
      // window.location.replace("/store");
    });
  };

  const logout = async () => {
            localStorage.removeItem("auth")
            localStorage.removeItem("admin")
            localStorage.removeItem("user")

            // window.location.replace("/store");
          }

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          placeholder="name"
          onChange={(e) => setRegisterName(e.target.value)}
        />
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>
      <form action="/logout" method="get">
        <button
          type="submit"
          onClick={() => logout}
        >
          Logout?
        </button>
      </form>
    </div>
  );
};

export default App;
