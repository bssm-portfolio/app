import useFileDrop from "@/hooks/useFileDrop";
import classNames from "classnames";
import Image from "next/image";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type AcceptType = "image" | "video";
interface DropFileUploaderProps {
  id?: string;
  className?: string;
  label?: string | ReactNode;
  isSingleFile?: boolean;
  accept?: AcceptType;
  setFileList: Dispatch<SetStateAction<File[]>>;
}

export default function DropFileUploader({
  id = "",
  className = "",
  label = "",
  isSingleFile = true,
  accept = "image",
  setFileList,
}: DropFileUploaderProps) {
  const [previewFile, setPreviewFile] = useState<File>();
  const { files, inputRef, isDragActive, labelRef } = useFileDrop({
    isSingleFile,
    accept: accept === "video" ? "video/*" : "image/*",
  });

  const getFileUploaderBorderCss = () => {
    return `
    relative
    border
    mb-2.5
    flex
    flex-col
    justify-center
    items-center
    gap-2.5
    rounded-lg
    cursor-pointer
    `;
  };

  useEffect(() => {
    setFileList(files);
    setPreviewFile(files[0]);
  }, [files, setFileList]);

  return (
    <label
      htmlFor={id}
      className={classNames(
        className,
        getFileUploaderBorderCss(),
        "relative w-full h-[11rem]",
        {
          "!border-2 !border-blue border-dotted": isDragActive,
        },
      )}
      ref={labelRef}
    >
      <input ref={inputRef} type="file" className="hidden" id={id} />

      {label}

      {previewFile && accept === "image" && (
        <Image
          src={URL.createObjectURL(previewFile)}
          alt="썸네일"
          fill
          sizes="20rem"
          className="rounded-lg -z-10 opacity-30"
        />
      )}

      {previewFile && accept === "video" && (
        <video
          src={URL.createObjectURL(previewFile)}
          className="w-full h-44 -z-10 absolute object-cover rounded-lg opacity-30"
        >
          <track kind="captions" src={URL.createObjectURL(previewFile)} />
        </video>
      )}
    </label>
  );
}
