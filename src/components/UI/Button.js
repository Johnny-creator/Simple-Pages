import React from "react";
import "./button.css";

const Button = (props) => {
  return (
    <button onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;
