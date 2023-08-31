import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Form/Input";
import Button from "../UI/Button";

import "./login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const nameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main>
      <h1 className="registerHeader"> Login</h1>
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

        <Button onClick={submitHandler} type="submit">
          Login
        </Button>
        <Link to="/"> Home</Link>
      </form>
    </main>
  );
};

export default Login;
