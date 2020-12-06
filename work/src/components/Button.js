import React from "react";
import "../css/button.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
const STYLES = ["btn--primary", "btn--outline"];

const SIZES = ["btn--medium", "btn--large"];

export const Button1 = ({
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
        <Link to="/login">login</Link>
      ) : (
        <Link to="/login">Logout?</Link>
      )}
    </button>

    //
  );
};
