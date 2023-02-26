import { RefObject } from "react";

const focusInput = (inputRef: RefObject<HTMLInputElement>) => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
};

const clearInput = (inputRef: RefObject<HTMLInputElement>) => {
  if (inputRef.current) {
    inputRef.current.value = "";
    focusInput(inputRef);
  }
};

const checkInputValueIsNull = (inputRef: RefObject<HTMLInputElement>) => {
  if (inputRef.current) {
    return !!inputRef.current.value.trimEnd();
  }
  return false;
};

export { focusInput, clearInput, checkInputValueIsNull };
