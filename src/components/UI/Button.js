import React from "react";
import "./button.css";

const Button = (props) => {
  return (
    <button onClick={props.onClick} disabled={props.disabled} type={props.type}>
      {props.disabled ? "Fill out information above"  : props.children}
    </button>
  );
};

export default Button;
