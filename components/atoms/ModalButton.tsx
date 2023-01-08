import classNames from "classnames";
import React from "react";
import Button, { ButtonProps } from "./Button";

export default function ModalButton({ varient, ...props }: ButtonProps) {
  return (
    <Button
      className={classNames(
        "fixed bottom-12",
        {
          "left-10": varient === "secondary",
        },
        {
          "right-10": varient !== "secondary",
        },
      )}
      {...props}
      varient={varient}
    />
  );
}
