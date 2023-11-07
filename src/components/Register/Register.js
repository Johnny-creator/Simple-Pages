import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";

import "./register.css";

const Register = () => {
  const [passwordConfirmation, setPasswordConfirmation] = useState(true);
  const [showPasswords, setShowPasswords] = useState(false);

  const {
    value: userName,
    isValid: enteredUserNameIsValid,
    hasError: enteredUserNameIsInvalid,
    inputChangeHandler: userNameChangeHandler,
    blurChangeHandler: userNameBlurHandler,
    reset: resetUserNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: email,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailIsInvalid,
    inputChangeHandler: emailChangeHandler,
    blurChangeHandler: emailBlurHandler,
    reset: resetEmailInput,
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
    enteredConfirmPasswordIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
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

    if (!enteredEmailIsValid) {
      return;
    }

    if (password !== confirmPassword) {
      setPasswordConfirmation(false);
      return;
    }

    let data = {
      username: userName,
      password: password,
      email: email,
    };

    try {
      const response = await fetch("http://localhost:5001/register/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Worked");
      } else {
        const parsedResponse = await response.json();
        console.log(parsedResponse.error);
      }
    } catch (error) {
      console.log("test");
      const parsedResponse = await response.json();
      console.log(parsedResponse.error);
    }

    resetUserNameInput();

    resetPasswordInput();

    resetConfirmPasswordInput();

    resetEmailInput();

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

        <label> Email: </label>
        <Input
          type="text"
          name="email"
          value={email}
          holder="Email: "
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        ></Input>
        {enteredEmailIsInvalid && (
          <p className="invalid"> Please enter a valid email. </p>
        )}

        <label> Password: </label>
        <Input
          type={showPasswords ? "text" : "password"}
          name="password"
          value={password}
          holder="Password: "
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        ></Input>
        {enteredPasswordIsInvalid && (
          <p className="invalid"> Please enter a valid password. </p>
        )}

        <label> Confirm Password: </label>
        <Input
          type={showPasswords ? "text" : "password"}
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
        <div className="passwordChecker">
          <label type="check">Show Passwords</label>
          <input
            id="check"
            type="checkbox"
            value={showPasswords}
            onChange={() => setShowPasswords((prev) => !prev)}
          />
        </div>

        <Button onClick={submitHandler} disabled={!formIsValid} type="submit">
          Create User
        </Button>
        <Link to="/"> Home</Link>
      </form>
    </main>
  );
};

export default Register;
