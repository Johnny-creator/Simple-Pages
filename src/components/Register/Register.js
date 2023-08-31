import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../UI/Button";

import "./register.css";

const Register = () => {
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
    <main>
      <h1 className="registerHeader"> Create User</h1>
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
          Create User
        </Button>
        <Link to="/"> Home</Link>
      </form>
    </main>
  );
};

export default Register;
