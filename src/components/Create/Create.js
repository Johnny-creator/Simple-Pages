import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "./../Input/Input";
import Button from "./../UI/Button";

import "./create.css";

const Create = () => {
  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    let path = `/result`;
    navigate(path);
  };

  return (
    <main>
      <h1> Create your page</h1>
      <form>
        <label>Title</label>
        <Input type="text" name="title"></Input>

        <label>Section 1</label>
        <Input type="text" name="sectionOne"></Input>

        <label>Section 2</label>
        <Input type="text" name="sectionTwo"></Input>

        <label>Section 3</label>
        <Input type="text" name="sectionThree"></Input>

        <div className="textBox">
          <label>First Text</label>
          <textarea name="firstText"></textarea>

          <label>Second Text</label>
          <textarea name="secondText"></textarea>

          <label>Third Text</label>
          <textarea name="thirdText"></textarea>
        </div>

        <div className="file">
          <label>Select Image: </label>
          <Input type="file"></Input>
        </div>
        <Button type="submit" onClick={submitHandler}>
          Create Page
        </Button>
        <Link to="/"> Home</Link>
      </form>
    </main>
  );
};

export default Create;
