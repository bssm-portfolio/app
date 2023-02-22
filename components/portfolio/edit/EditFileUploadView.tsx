import FileUploader from "@/components/atoms/FileUploader";
import Input from "@/components/atoms/Input";
import { S3File } from "@/types/file.interface";
import { PortfolioForm } from "@/types/portfolio.interface";
import { getFileDownloadUrl } from "@/utils/file";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

interface FileUploadViewProps {
  register: UseFormRegister<PortfolioForm>;
  thumbnailFileUid: string;
  setThumbnailFile: Dispatch<SetStateAction<File | undefined>>;
  videoFileUid: string;
  setVideoFile: Dispatch<SetStateAction<File | undefined>>;
  thumbnail: S3File;
}

export default function FileUploadView({
  register,
  thumbnailFileUid,
  setThumbnailFile,
  videoFileUid,
  setVideoFile,
  thumbnail,
}: FileUploadViewProps) {
  type FileUploaderType = "thumbnail" | "video";

  const getBackgroundImageCss = (varient: FileUploaderType) => {
    const width = varient === "thumbnail" ? "20rem" : "full";
    const backgroundImageUrl = `before:bg-[url(${getFileDownloadUrl(
      thumbnail,
    )})]`;
    return `
    relative 
    flex 
    items-center 
    justify-center 
    w-[${width}]
    min-w-[20rem]
    max-w-[34rem]
    h-[11.25rem]
    border 
    border-primary-border_gray
    rounded-lg
    before:rounded-lg
    before:-z-10
    before:absolute 
    before:inset-0 
    ${backgroundImageUrl}
    before:bg-cover
    before:opacity-30 
    before:bg-no-repeat
    `;
  };

  return (
    <div>
      <div className={getBackgroundImageCss("thumbnail")}>
        <FileUploader
          id="edit-thumbnail-uploader"
          label="썸네일 업로드"
          onChange={(event) => {
            if (event.target.files) setThumbnailFile(event.target.files[0]);
          }}
        />
      </div>
      <div className={getBackgroundImageCss("video")}>
        <FileUploader
          id="edit-video-uploader"
          label="동영상 업로드"
          onChange={(event) => {
            if (event.target.files) setVideoFile(event.target.files[0]);
          }}
        />
      </div>
      <Input
        registerReturn={register("thumbnailFileUid")}
        value={thumbnailFileUid}
        type="hidden"
      />
      <Input
        registerReturn={register("videoFileUid")}
        value={videoFileUid}
        type="hidden"
      />
    </div>
  );
}
