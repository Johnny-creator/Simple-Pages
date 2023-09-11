import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";

import "./register.css";

const Register = () => {
  const [passwordConfirmation, setPasswordConfirmation] = useState(true);

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

  const {
    value: confirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: enteredConfirmPasswordIsInvalid,
    inputChangeHandler: confirmPasswordChangeHandler,
    blurChangeHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    enteredUserNameIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid
  ) {
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

    if (!enteredConfirmPasswordIsValid) {
      return;
    }

    if (password !== confirmPassword) {
      setPasswordConfirmation(false);
      return;
    }

    resetUserNameInput();

    resetPasswordInput();

    resetConfirmPasswordInput();

    setPasswordConfirmation(true);
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
          onChange={userNameChangeHandler}
          onBlur={userNameBlurHandler}
        ></Input>
        {enteredUserNameIsInvalid && (
          <p className="invalid"> Please enter a valid username. </p>
        )}

        <label> Password: </label>
        <Input
          type="text"
          name="password"
          value={password}
          holder="Password: "
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        ></Input>
        {enteredPasswordIsInvalid && (
          <p className="invalid"> Please enter a valid password. </p>
        )}

        <label> Create Password: </label>
        <Input
          type="text"
          name="confirmPassword"
          value={confirmPassword}
          holder="Confirm Password: "
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
        ></Input>
        {enteredConfirmPasswordIsInvalid && (
          <p className="invalid">
            Please enter a valid confirmation password.{" "}
          </p>
        )}
        {!passwordConfirmation && (
          <p className="invalid"> Passwords must match.</p>
        )}
        <Button onClick={submitHandler} disabled={!formIsValid} type="submit">
          Create User
        </Button>
        <Link to="/"> Home</Link>
      </form>
    </main>
  );
};

export default Register;
