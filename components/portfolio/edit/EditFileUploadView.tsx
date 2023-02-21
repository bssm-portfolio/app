import FileUploader from "@/components/atoms/FileUploader";
import Input from "@/components/atoms/Input";
import { PortfolioForm } from "@/types/portfolio.interface";
import { handleFileUpload } from "@/utils/file";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

interface FileUploadViewProps {
  register: UseFormRegister<PortfolioForm>;
  thumbnailFileUid: string;
  setThumbnailFileUid: Dispatch<SetStateAction<string>>;
  videoFileUid: string;
  setVideoFileUid: Dispatch<SetStateAction<string>>;
}

export default function FileUploadView({
  register,
  thumbnailFileUid,
  setThumbnailFileUid,
  videoFileUid,
  setVideoFileUid,
}: FileUploadViewProps) {
  return (
    <div className="w-full border h-60 mb-2.5 flex flex-col justify-center items-center border-primary-border_gray gap-2.5 rounded-lg">
      <FileUploader
        id="edit-thumbnail-uploader"
        label="썸네일 업로드"
        onChange={(event) => handleFileUpload(event, setThumbnailFileUid)}
      />
      <FileUploader
        id="edit-video-uploader"
        label="동영상 업로드"
        onChange={(event) => handleFileUpload(event, setVideoFileUid)}
      />
      <Input
        registerReturn={register("thumbnailFileUid", { required: true })}
        value={thumbnailFileUid}
        type="hidden"
      />
      <Input
        registerReturn={register("videoFileUid")}
        value={videoFileUid}
        type="hidden"
      />
      <p>동영상 파일을 드래그 앤 드롭하여 업로드</p>
    </div>
  );
}
