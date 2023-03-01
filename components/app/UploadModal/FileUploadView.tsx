import FileUploader from "@/components/atoms/FileUploader";
import Input from "@/components/atoms/Input";
import { PortfolioForm } from "@/types/portfolio.interface";
import classNames from "classnames";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

export default function FileUploadView({
  register,
  className,
  videoFile,
  setVideoFile,
  setThumbnailFile,
  thumbnailFile,
  ...props
}: {
  register: UseFormRegister<PortfolioForm>;
  className?: string;
  videoFile: File | undefined;
  setVideoFile: Dispatch<SetStateAction<File | undefined>>;
  thumbnailFile: File | undefined;
  setThumbnailFile: Dispatch<SetStateAction<File | undefined>>;
}) {
  const getFileUploaderBorderCss = () => {
    return `
    relative
    border
    mb-2.5
    flex
    flex-col
    justify-center
    items-center
    border-primary-border_gray
    gap-2.5
    rounded-lg`;
  };

  return (
    <div className={classNames("flex flex-col gap-8", className)} {...props}>
      <div>
        <h2 className="mb-2">동영상</h2>
        <div
          className={classNames("w-full h-[11rem]", getFileUploaderBorderCss())}
        >
          <FileUploader
            id="video-uploader"
            label="동영상 업로드"
            onChange={(event) => {
              if (event.target.files) setVideoFile(event.target.files[0]);
            }}
          />
          {videoFile && (
            <video
              src={URL.createObjectURL(videoFile)}
              className="w-full h-44 -z-10 absolute object-cover rounded-lg opacity-30"
            >
              <track kind="captions" src={URL.createObjectURL(videoFile)} />
            </video>
          )}
        </div>

        <div>
          <h2 className="mb-2">웹 주소</h2>
          <div className="w-full flex flex-col items-center border-primary-border_gray gap-2.5 rounded-lg">
            <Input
              registerReturn={register("portfolioUrl")}
              className="w-full"
              placeholder="URL 입력"
            />
          </div>
        </div>

        <h2 className="mt-5 mb-2">썸네일</h2>
        <div
          className={classNames(
            "w-[20rem] h-[11.25rem]",
            getFileUploaderBorderCss(),
          )}
        >
          <FileUploader
            id="thumbnail-uploader"
            label="썸네일 업로드"
            onChange={(event) => {
              if (event.target.files) setThumbnailFile(event.target.files[0]);
            }}
          />
          {thumbnailFile && (
            <Image
              src={URL.createObjectURL(thumbnailFile)}
              alt="ddd"
              fill
              sizes="20rem"
              className="rounded-lg -z-10 opacity-30"
            />
          )}
        </div>
        <span>이미지 사이즈: 1280x720 (너비 640px 이상)</span>
      </div>
    </div>
  );
}
