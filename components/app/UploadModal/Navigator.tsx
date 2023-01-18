import Button from "@/components/atoms/Button";
import classNames from "classnames";

interface FileUploadViewProps {
  goPrev: (() => void) | null;
  goNext: () => void;
  isLast: boolean;
  className?: string;
}

export default function Navigator({
  goPrev,
  goNext,
  isLast,
  ...props
}: FileUploadViewProps) {
  return (
    <div
      {...props}
      className={classNames("flex justify-between", props.className)}
    >
      {goPrev ? (
        <Button onClick={goPrev} varient="secondary">
          이전
        </Button>
      ) : (
        <div />
      )}

      <Button className={classNames({ hidden: !isLast })} type="submit">
        완료
      </Button>
      <Button
        className={classNames({ hidden: isLast })}
        type="button"
        onClick={goNext}
      >
        다음
      </Button>
    </div>
  );
}
