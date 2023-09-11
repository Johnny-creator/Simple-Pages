import { useState } from "react";

const useInput = (validateValue) => {
  const [input, setInput] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const inputIsValid = validateValue(input);
  const inputIsInvalid = !inputIsValid && inputTouched;

  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const blurChangeHandler = () => {
    setInputTouched(true);
  };

  const reset = () => {
    setInput("");
    setInputTouched(false);
  };

  return {
    value: input,
    isValid: inputIsValid,
    hasError: inputIsInvalid,
    inputChangeHandler,
    blurChangeHandler,
    reset,
  };
};

export default useInput;
