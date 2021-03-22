import React from "react";
import "./Sidebar.css";
import logo from "http://res.cloudinary.com/dhey8vvcx/image/upload/v1612636018/Blue%20FILA%20spell%20out%20padded%20jacket0.jpg.jpg";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div id="sidebar" className={sidebarOpen ? "sidebar-responsive" : ""}>
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>pure vintage</h1>
        </div>
        <i
          clasName="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <a href="#">dashboard</a>
          <h2>mng</h2>
          <div className="sidebar__link">
            <i className="fa fa-user-secret"></i>
            <a href="#">admin mgn</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-building-o"></i>
            <a href="#">comp mgn</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-wrench"></i>
            <a href="#">emply mgn</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-archive"></i>
            <a href="#">stock</a>
          </div>
          <h2>leave</h2>
          <div className="sidebar__link">
            <i className="fa fa-handshake"></i>
            <a href="#">contracts</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-question"></i>
            <a href="#">requests</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-sign-out"></i>
            <a href="#">leave policy</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-calender-check-ot"></i>
            <a href="#">speacial days</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-files-o"></i>
            <a href="#">apply leave</a>
          </div>
          <h2>payroll</h2>

          <div className="sidebar__link">
            <i className="fa fa-money"></i>
            <a href="#">pay</a>
          </div>
          <div className="sidebar__link">
            <i className="fa fa-briefcase"></i>
            <a href="#">paygrade</a>
          </div>
          <div className="sidebar__logout">
            <i className="fa fa-power-off"></i>
            <a href="#">logout</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
