import React from "react";
import "./button.css";

const Button = (props) => {
  return (
    <>
      <button
        onClick={props.onClick}
        disabled={props.disabled}
        type={props.type}
      >{props.children}</button>
      <p> {props.disabled ? "Fill out information above" : ""}</p>
    </>
  );
};

export default Button;
