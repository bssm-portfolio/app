import DropFileUploader from "@/components/atoms/DropFileUploader";
import Input from "@/components/atoms/Input";
import { PortfolioForm } from "@/types/portfolio.interface";
import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

interface FileUploadViewProps {
  register: UseFormRegister<PortfolioForm>;
  className?: string;
  setVideoFileList: Dispatch<SetStateAction<File[]>>;
  setThumbnailFileList: Dispatch<SetStateAction<File[]>>;
}

export default function FileUploadView({
  register,
  className,
  setVideoFileList,
  setThumbnailFileList,
  ...props
}: FileUploadViewProps) {
  return (
    <div className={classNames("flex flex-col gap-8", className)} {...props}>
      <div>
        <h2 className="mb-2">동영상</h2>
        <DropFileUploader
          id="video"
          setFileList={setVideoFileList}
          label="동영상 드래그 앤 드롭으로 업로드"
          accept="video"
        />
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
        <DropFileUploader
          id="thumbnail"
          setFileList={setThumbnailFileList}
          label="썸네일 드래그 앤 드롭으로 업로드"
        />
        <span>이미지 사이즈: 1280x720 (너비 640px 이상)</span>
      </div>
    </div>
  );
}
