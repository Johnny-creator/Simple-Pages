import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../UI/Button";

import "./register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userNameIsTouched, setUserNameIsTouched] = useState(false);
  const enteredUserNameIsValid = userName.trim() !== "";
  const enteredUserNameIsInvalid = !enteredUserNameIsValid && userNameIsTouched;

  const [password, setPassword] = useState("");
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const enteredPasswordIsValid = password.trim() !== "";
  const enteredPasswordIsInvalid = !enteredPasswordIsValid && passwordIsTouched;

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordIsTouched, setConfirmPasswordIsTouched] =
    useState(false);
  const enteredConfirmPasswordIsValid = confirmPassword.trim() !== "";
  const enteredConfirmPasswordIsInvalid =
    !enteredConfirmPasswordIsValid && confirmPasswordIsTouched;

  const [passwordConfirmation, setPasswordConfirmation] = useState(true);

  let formIsValid = false;

  if (
    enteredUserNameIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid &&
    passwordConfirmation
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

    setUserName("");
    setUserNameIsTouched(false);

    setPassword("");
    setPasswordIsTouched(false);

    setConfirmPassword("");
    setConfirmPasswordIsTouched(false);

    setPasswordConfirmation(true);
  };

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const userNameBlurHandler = () => {
    setUserNameIsTouched(true);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordConfirmation(true);
  };

  const passwordBlurHandler = () => {
    setPasswordIsTouched(true);
  };

  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordConfirmation(true);
  };

  const confirmPasswordBlurHandler = () => {
    setConfirmPasswordIsTouched(true);
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
