import FileUploader from "@/components/atoms/FileUploader";
import Input from "@/components/atoms/Input";
import { PortfolioForm } from "@/types/portfolio.interface";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

interface FileUploadViewProps {
  register: UseFormRegister<PortfolioForm>;
  thumbnailFileUid: string;
  setThumbnailFile: Dispatch<SetStateAction<File | undefined>>;
  videoFileUid: string;
  setVideoFile: Dispatch<SetStateAction<File | undefined>>;
  thumbnailUrl: string;
  videoUrl: string | undefined;
  editThumbnailFile: File | undefined;
  editVideoFile: File | undefined;
}

export default function FileUploadView({
  register,
  thumbnailFileUid,
  setThumbnailFile,
  videoFileUid,
  setVideoFile,
  thumbnailUrl,
  videoUrl,
  editThumbnailFile,
  editVideoFile,
}: FileUploadViewProps) {
  type FileUploaderType = "thumbnail" | "video";

  const getBackgroundImageCss = (varient: FileUploaderType) => {
    const width = varient === "thumbnail" ? "w-[20rem]" : "w-full";
    const height = varient === "thumbnail" ? "h-[11.25rem]" : "h-60";

    return `
    relative 
    flex 
    items-center 
    justify-center 
    ${width}
    ${height}
    border 
    border-primary-border_gray
    rounded-lg
    object-cover
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
        <Image
          src={
            editThumbnailFile
              ? URL.createObjectURL(editThumbnailFile)
              : thumbnailUrl
          }
          fill
          alt="썸네일"
          className="rounded-lg -z-10 opacity-30"
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
        <video
          src={editVideoFile ? URL.createObjectURL(editVideoFile) : videoUrl}
          className="w-full h-60 -z-10 absolute object-cover rounded-lg opacity-30"
        >
          <track
            kind="captions"
            src={editVideoFile ? URL.createObjectURL(editVideoFile) : videoUrl}
          />
        </video>
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
