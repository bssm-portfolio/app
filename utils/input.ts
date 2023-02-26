import { RefObject } from "react";
import { FieldErrorsImpl, FieldValues } from "react-hook-form";

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

const getErrorProperty = <T extends FieldValues>(
  inValidData: Partial<FieldErrorsImpl<T>>,
): string => {
  return Object.values(inValidData)
    .map((inValidProperty) => inValidProperty.message)
    .join(", ");
};

export { focusInput, clearInput, checkInputValueIsNull, getErrorProperty };
