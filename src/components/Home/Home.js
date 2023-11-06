import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import "./home.css";

const Home = () => {
  const [animate, setAnimate] = useState();

  useEffect(() => {
    if (localStorage.getItem("animate") === null) {
      setAnimate(true);
      localStorage.setItem("animate", 1);
    } else {
      setAnimate(false);
    }
  }, []);

  return (
    <main className={animate ? "animate" : ""}>
      <h1> Welcome to Simple Site Maker</h1>

      <div className="container">
        <div className="box">
          <Link to="/create">
            <Button type="button"> Build Website </Button>
          </Link>
          <p> Create some simple HTML pages </p>
        </div>

        <div className="box">
          <Link to="/login">
            <Button type="button"> Log In </Button>
          </Link>
          <p> Login to view and save your pages </p>
        </div>

        <div className="box">
          <Link to="/register">
            <Button type="button"> Register </Button>
          </Link>
          <p> Create an account to save your pages </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
