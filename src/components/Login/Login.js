import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../UI/Button";

import "./login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userNameIsTouched, setUserNameIsTouched] = useState(false);
  const enteredUserNameIsValid = userName.trim() !== "";
  const enteredUserNameIsInvalid = !enteredUserNameIsValid && userNameIsTouched;

  const [password, setPassword] = useState("");
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const enteredPasswordIsValid = password.trim() !== "";
  const enteredPasswordIsInvalid = !enteredPasswordIsValid && passwordIsTouched;

  let formIsValid = false;

  if (enteredUserNameIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!enteredUserNameIsValid) {
      return;
    }

    if (!enteredPasswordIsValid) {
      return;
    }

    setUserName("");
    setUserNameIsTouched(false);

    setPassword("");
    setPasswordIsTouched(false);
  };

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const userNameBlurHandler = () => {
    setUserNameIsTouched(true);
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordBlurHandler = () => {
    setPasswordIsTouched(true);
  }

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
          onChange={userNameChangeHandler}
          onBlur={userNameBlurHandler}
        ></Input>
        {enteredUserNameIsInvalid && <p className="invalid"> Please enter a valid user name. </p>}

        <label> Password: </label>
        <Input
          type="text"
          name="password"
          value={password}
          holder="Password: "
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        ></Input>
        {enteredPasswordIsInvalid && <p className="invalid"> Please enter a valid password. </p>}

        <Button onClick={submitHandler} disabled={!formIsValid} type="submit">
          Login
        </Button>
        <Link to="/"> Home</Link>
      </form>
    </main>
  );
};

export default Login;
