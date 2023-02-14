import httpClient from "@/apis";
import FileUploader from "@/components/atoms/FileUploader";
import Input from "@/components/atoms/Input";
import { PortfolioForm } from "@/types/portfolio.interface";
import classNames from "classnames";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { UseFormRegister } from "react-hook-form";

export default function FileUploadView({
  register,
  className,
  setVideoFileUid,
  setThumbnailFileUid,
  ...props
}: {
  register: UseFormRegister<PortfolioForm>;
  className?: string;
  setVideoFileUid: Dispatch<SetStateAction<string>>;
  setThumbnailFileUid: Dispatch<SetStateAction<string>>;
}) {
  const [fileUploadStatus, setFileUploadStatus] = useState<string>("");

  const handleVideoFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      const flieName = e.target.files[0].name;
      formData.append("file", e.target.files[0]);
      setFileUploadStatus(`${flieName} 업로드 중..`);

      httpClient.file.upload(formData).then((r) => {
        setVideoFileUid(r.data.fileUid);
        setFileUploadStatus(`${flieName} 업로드 완료`);
      });
    }
  };

  return (
    <div className={classNames("flex flex-col gap-8", className)} {...props}>
      <div>
        <h2 className="mb-2">동영상</h2>
        <div className="w-full border h-60 mb-2.5 flex flex-col justify-center items-center border-primary-border_gray gap-2.5 rounded-lg">
          {fileUploadStatus ? (
            <p>{fileUploadStatus}</p>
          ) : (
            <>
              <FileUploader
                label="동영상 업로드"
                onChange={handleVideoFileUpload}
              />
              <p>동영상 파일을 드래그 앤 드롭하여 업로드</p>
            </>
          )}
        </div>
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
    </div>
  );
}
