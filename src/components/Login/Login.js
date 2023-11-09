import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";

import "./login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    value: userName,
    isValid: enteredUserNameIsValid,
    hasError: enteredUserNameIsInvalid,
    inputChangeHandler: userNameChangeHandler,
    blurChangeHandler: userNameBlurHandler,
    reset: resetUserNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: password,
    isValid: enteredPasswordIsValid,
    hasError: enteredPasswordIsInvalid,
    inputChangeHandler: passwordChangeHandler,
    blurChangeHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

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

    resetUserNameInput();

    resetPasswordInput();
  };

  return (
    <main>
      <h1 className="registerHeader"> Login</h1>
      <form>
        <label> User Name: </label>
        <Input
          invalid={enteredUserNameIsInvalid ? "invalid-input" : ""}
          type="text"
          name="userName"
          value={userName}
          onChange={userNameChangeHandler}
          onBlur={userNameBlurHandler}
        ></Input>
        {enteredUserNameIsInvalid && (
          <p className="invalid"> Please enter a valid user name. </p>
        )}

        <label> Password: </label>
        <Input
          invalid={enteredPasswordIsInvalid ? "invalid-input" : ""}
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        ></Input>
        {enteredPasswordIsInvalid && (
          <p className="invalid"> Please enter a valid password. </p>
        )}
        <div className="passwordChecker">
          <label type="check">Show Password</label>
          <input
            id="check"
            type="checkbox"
            value={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
        </div>

        <Button onClick={submitHandler} disabled={!formIsValid} type="submit">
          Login
        </Button>
        <Link to="/"> Home</Link>
      </form>
    </main>
  );
};

export default Login;
