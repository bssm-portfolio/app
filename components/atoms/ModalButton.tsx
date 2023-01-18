import classNames from "classnames";
import Button, { ButtonProps } from "./Button";

export default function ModalButton({
  varient = "primary",
  ...props
}: ButtonProps) {
  return (
    <Button
      className={classNames(
        "fixed bottom-12",
        {
          "left-10": varient === "secondary",
        },
        {
          "right-10": varient === "primary",
        },
      )}
      {...props}
      varient={varient}
    />
  );
}
