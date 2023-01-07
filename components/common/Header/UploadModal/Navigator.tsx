import Button from "@/components/atoms/Button";
import classNames from "classnames";
import React from "react";

interface FileUploadViewProps {
  goPrev: (() => void) | null;
  goNext: () => void;
  onSubmit: (() => void) | null;
}

export default function Navigator({
  goPrev,
  goNext,
  onSubmit,
}: FileUploadViewProps) {
  return (
    <div
      className={classNames("flex mt-12 mb-9", {
        "justify-end": !goPrev,
        "justify-between": !!goPrev,
      })}
    >
      {!!goPrev && (
        <Button onClick={goPrev} varient="secondary">
          이전
        </Button>
      )}
      {onSubmit ? (
        <Button onClick={onSubmit}>완료</Button>
      ) : (
        <Button onClick={goNext}>다음</Button>
      )}
    </div>
  );
}
