import React from "react";
import "./header.css";
import Button from "./Button";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header>
      <Link to="/">
        <h1>Simple Site Maker </h1>
      </Link>
      <div className="userLinks">
        <Link to="/login"> Login </Link>
        <Link to="/register"> Register </Link>
        <Button onClick={props.onClick} type="button"> Light/Dark Toggle </Button>
      </div>
    </header>
  );
};

export default Header;
