import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import React from "react";

export default function UploadModal() {
  return (
    <>
      <div className="w-full border h-60 flex flex-col justify-center items-center border-primary-border_gray gap-2.5 rounded-lg">
        <FileUploader label="동영상 업로드" />
        <p>동영상 파일을 드래그 앤 드롭하여 업로드</p>
      </div>
      <div className="w-full border h-60 flex flex-col justify-center items-center border-primary-border_gray gap-2.5 rounded-lg">
        <FileUploader label="웹 파일 선택" />
        <p>웹 파일을 드래그 앤 드롭하여 업로드</p>
      </div>
      <div className="flex justify-end mt-12 mb-9">
        <Button>다음</Button>
      </div>
    </>
  );
}
