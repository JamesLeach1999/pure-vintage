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
  console.log(loginUsername)
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
        console.log(res.data)
        props.handleLogin(res.data.passport);
        if(localStorage.getItem("user")){
  
          window.location.replace("/store");
        }
      } else {
        props.handleLogin(false);
      }

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
        <br/>
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <br/>
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <br/>
        <button onClick={register}>Submit</button>
      </div>

      <div>
        {/* <form> */}
          <h1>Login</h1>
          <input
            placeholder="username"
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <br/>
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <br/>
          <button onClick={login}>Submit</button>
      {/* </form> */}
        </div>
<br/>
      <form action="/logout" method="get">
        <button type="submit" onClick={logout}>
          Logout?
        </button>
      </form>
    </div>
  );
};

export default App;
