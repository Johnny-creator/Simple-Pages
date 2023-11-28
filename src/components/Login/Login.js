import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import Input from "../Input/Input";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";

import "./login.css";

const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);
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

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!enteredUserNameIsValid) {
      return;
    }

    if (!enteredPasswordIsValid) {
      return;
    }

    try {
      setLoading(true);
      const data = { username: userName, password: password };
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setLoading(false);
      const messageReceival = await response.json();
      console.log(messageReceival);
      setMessage(messageReceival.message);

      if (response.ok) {
        console.log("Response okay");
        props.retrieveStatus(true);
      } else {
        console.log("Response not okay");
      }
    } catch (error) {
      console.log(error);
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
            Login
          </Button>
        )}

        <Link to="/"> Home</Link>
        {message && <p> {message} </p>}
      </form>
    </main>
  );
};

export default Login;
