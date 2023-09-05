import React from "react";

import "./input.css";

const Input = (props) => {
  return (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      placeholder={props.holder}
      onChange={props.onChange}
      onBlur={props.onBlur}
    ></input>
  );
};

export default Input;
