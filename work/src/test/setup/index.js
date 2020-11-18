import React from "react";
// react router, this isnt part of react so gotta npm install
//
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// pages
import Home from "./Home";
import About from "./About";
import People from "./People";
import Error from "./Error";
import Person from "./Person";
// navbar
// this is basically a single page app
import Navbar from "./Navbar";
const ReactRouterSetup = () => {
  // always have to wrap in the router bit, usually you wrap the entire app in Router
  return (
    <Router>
      {/* nav component created, so place in router above switch */}
      {/* added to every page, even the error */}
      <Navbar />
      <Switch>
        {/* with swicth only the first to match is displayed, error always at the bottom */}
        <Route exact path="/">
          <Home />
        </Route>
        {/* can call the url whatever you want */}
        <Route path="/about">
          <About />
        </Route>
        <Route path="/people">
          <People />
        </Route>
        {/* url params, your basic get request, can make beginning path what you want */}
        <Route path="/:id" children={<Person/>}>

        </Route>
        {/* for displaying the rror page, will always show as this matches any page */}
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      {/* gotta have this att named prop, also call this the domain when live */}
      {/* issue is when you go to another page, you also get the home page too, since the path technically matches */}
    </Router>
  );
};

export default ReactRouterSetup;
