import "./Navbar.css";
import avatar from "http://res.cloudinary.com/dhey8vvcx/image/upload/v1612636018/Blue%20FILA%20spell%20out%20padded%20jacket0.jpg.jpg";

import React from "react";

const Navbar = ({ sidebaropen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar__left">
        <a href="#">subs</a>
        <a href="#">vids</a>
        <a className="active_link" href="#">
          Admin
        </a>
      </div>
      <div className="navbar__right">
        <a href="#">
          <i className="fa fa-search"></i>
        </a>
        <a href="#">
          <i className="fa fa-clock-o"></i>
        </a>
        <a href="#">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
