import FileUploader from "@/components/atoms/FileUploader";
import Input from "@/components/atoms/Input";
import LabelForm from "@/components/atoms/LabelForm";
import Video from "@/components/atoms/Video";
import { PortfolioForm } from "@/types/portfolio.interface";
import Image from "next/image";
import { CSSProperties, Dispatch, SetStateAction } from "react";
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
    const width = varient === "thumbnail" ? "w-[20rem]" : "w-[30rem]";
    const height = varient === "thumbnail" ? "h-[11.25rem]" : "h-[11.25rem]";

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
  const videoStyle: CSSProperties = {
    position: "absolute",
    objectFit: "cover",
    zIndex: "-10",
    opacity: "0.3",
  };

  return (
    <div>
      <LabelForm label="썸네일 업로드" className="mb-4">
        <div className={`${getBackgroundImageCss("thumbnail")} w-full`}>
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
      </LabelForm>

      <LabelForm label="동영상 업로드" className="mb-4">
        <div className={`${getBackgroundImageCss("video")} w-full`}>
          <FileUploader
            id="edit-video-uploader"
            label="동영상 업로드"
            onChange={(event) => {
              if (event.target.files) setVideoFile(event.target.files[0]);
            }}
          />

          <video className="w-full h-full -z-10 !absolute object-cover rounded-lg opacity-30">
            <track
              kind="captions"
              src={
                editVideoFile ? URL.createObjectURL(editVideoFile) : videoUrl
              }
            />
          </video>

          <Video
            style={videoStyle}
            src={editVideoFile ? URL.createObjectURL(editVideoFile) : videoUrl}
          />
        </div>
      </LabelForm>

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
