import ModalButton from "@/components/atoms/ModalButton";

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
    <>
      {!!goPrev && (
        <ModalButton onClick={goPrev} varient="secondary">
          이전
        </ModalButton>
      )}
      {onSubmit ? (
        <ModalButton onClick={onSubmit}>완료</ModalButton>
      ) : (
        <ModalButton onClick={goNext}>다음</ModalButton>
      )}
    </>
  );
}
