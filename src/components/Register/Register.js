import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import Input from "../Input/Input";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";

import "./register.css";

const Register = () => {
  const [passwordConfirmation, setPasswordConfirmation] = useState(true);
  const [showPasswords, setShowPasswords] = useState(false);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState();

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
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5001/register/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      if (parsedResponse.message) {
        setMessage(parsedResponse.message);
      } else {
        setMessage(parsedResponse.error);
      }
    } catch (error) {
      const parsedResponse = await response.json();
      console.log(parsedResponse.error);
    }

    setLoading(false);

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
          invalid={enteredUserNameIsInvalid ? "invalid-input" : ""}
          type="text"
          name="userName"
          value={userName}
          onChange={userNameChangeHandler}
          onBlur={userNameBlurHandler}
        ></Input>
        {enteredUserNameIsInvalid && (
          <p className="invalid"> Please enter a valid username. </p>
        )}

        <label> Email: </label>
        <Input
          invalid={enteredEmailIsInvalid ? "invalid-input" : ""}
          type="text"
          name="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        ></Input>
        {enteredEmailIsInvalid && (
          <p className="invalid"> Please enter a valid email. </p>
        )}

        <label> Password: </label>
        <Input
          invalid={enteredPasswordIsInvalid ? "invalid-input" : ""}
          type={showPasswords ? "text" : "password"}
          name="password"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        ></Input>
        {enteredPasswordIsInvalid && (
          <p className="invalid"> Please enter a valid password. </p>
        )}

        <label> Confirm Password: </label>
        <Input
          invalid={enteredConfirmPasswordIsInvalid ? "invalid-input" : ""}
          type={showPasswords ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
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

        {message && <p className="message">{message}</p>}

        {loading ? (
          <SpinnerCircularFixed
            size={50}
            thickness={100}
            speed={100}
            color="rgba(255, 255, 255, 1)"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
        ) : (
          <Button onClick={submitHandler} disabled={!formIsValid} type="submit">
            Create User
          </Button>
        )}

        <Link to="/"> Home</Link>
      </form>
    </main>
  );
};

export default Register;
