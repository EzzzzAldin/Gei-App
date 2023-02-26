import { useState } from "react";

const useInput = (validateValue) => {
  // State Of Input
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // Validate Function
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  // Functions
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
