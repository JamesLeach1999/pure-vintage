import React, { useState } from "react";
// import "./App.css";
import Axios from "axios";

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
        // props.handleLogin(res.data.passport);
        Axios({
          method: "POST",
          data: {
            email: registerUsername,
            password: registerPassword,
          },
          withCredentials: true,

          url: "/login",
        }).then((res) => {
          if (res.data) {
            console.log(res.data);
            props.handleLogin(res.data.passport);
            if (sessionStorage.getItem("user")) {
              console.log("numberwang login");
              window.location.replace("/store");
            }
          } else {
            props.handleLogin(false);
          }
        });
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
        console.log(res.data);
        props.handleLogin(res.data.passport);
        if (sessionStorage.getItem("user")) {
          console.log("numberwang login");
          window.location.replace("/store");
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
    <div className="App">
      <br/><br/><br/><br/>
      <div>
        <h1>Register</h1>
        <input
          placeholder="name"
          onChange={(e) => setRegisterName(e.target.value)}
        />
        <br /> <br />
        <input
          placeholder="email"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <br /> <br />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <br />
        <button onClick={register}>Register</button>
      </div>
      <br />
      <br />

      <div>
        {/* <form> */}
        <h1>Login</h1>
        <input
          placeholder="email"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <br />
        <br />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <br />
        <button className="wow" onClick={login}>
          Login
        </button>
        {/* </form> */}
      </div>
      <br />
      <form action="/logout" method="get">
        <button className="wow" type="submit" onClick={logout}>
          Logout?
        </button>
      </form>
    </div>
  );
};

export default App;
