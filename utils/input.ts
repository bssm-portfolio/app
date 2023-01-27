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

export { focusInput, clearInput };
