import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// import "./index.css";

// import Footer from "./components/Footer"

function GetAuth() {
  var [auth, setAuth] = useState(false);
  var [admin, setAdmin] = useState(false);

  const auth1 = async () => {
    const a = await fetch('/store');
    setAuth(true);
    return a;
  };

  useEffect(() => {
    auth1();
  });
  return(
      {auth}
  );
}

export default GetAuth;
