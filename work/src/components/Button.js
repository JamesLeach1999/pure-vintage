import React from "react";
import "../css/button.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
const STYLES = ["btn--primary", "btn--outline"];

const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {sessionStorage.getItem("auth") === "false" ||
      !sessionStorage.getItem("auth") ? (
        <li className="nav-links">
          <Link to="/login">login</Link>
        </li>
      ) : (
        <li className="nav-links-mobile">
          <Link to="/login">Logout?</Link>
        </li>
      )}
      {children}
    </button>
  );
};
