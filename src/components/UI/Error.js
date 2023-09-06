import React from "react";
import { Link } from "react-router-dom";

import Button from "./Button";

import './error.css';

const Error = () => {
  return (
    <main className="error">
      <h1>Oops, there's been an error!</h1>
      <Link to="/">
        <Button type="button"> Return Home </Button>
      </Link>
    </main>
  );
};

export default Error;
