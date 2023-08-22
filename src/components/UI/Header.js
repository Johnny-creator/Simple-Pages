import React from "react";
import "./header.css";
import Button from "./Button";

const Header = (props) => {
  return (
    <header>
      <a href="/">
        <h1>Simple Site Maker </h1>
      </a>
      <div className="userLinks">
        <a href="/"> Login </a>
        <a href="/"> Register </a>
        <Button onClick={props.onClick} type="button"> Light/Dark Toggle </Button>
      </div>
    </header>
  );
};

export default Header;
