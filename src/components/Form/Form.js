import React, { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";

import "./form.css";

const Form = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const nameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <form>
        <label> User Name: </label>
        <Input
          type="text"
          name="userName"
          value={userName}
          holder="User Name: "
          onChange={nameChangeHandler}
        ></Input>

        <label> Password: </label>
        <Input
          type="text"
          name="password"
          value={password}
          holder="Password: "
          onChange={passwordChangeHandler}
        ></Input>

        <label> Create Password: </label>
        <Input
          type="text"
          name="confirmPassword"
          value={confirmPassword}
          holder="Confirm Password: "
          onChange={confirmPasswordChangeHandler}
        ></Input>
        <Button onClick={submitHandler} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Form;
