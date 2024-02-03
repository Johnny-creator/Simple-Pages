import React from "react";
import Button from "../UI/Button";
import { Link, useNavigate } from "react-router-dom";

const Result = () => {
  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    navigate(`/userpage`);
  }

  return (
    <main>
      <h1> View or download your page! </h1>
      <Button onClick={submitHandler}>View Page</Button>
      <Link to="/"> Home</Link>
    </main>
  );
};

export default Result;
