import httpClient from "@/apis";
import config from "@/config";
import { S3File } from "@/types/file.interface";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const getFileDownloadUrl = (file: S3File) => {
  return `${config.baseURL}/api/file/download/${file.fileUid}`;
};

export const handleFileUpload = (
  event: ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<string>>,
) => {
  if (event.target.files) {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    httpClient.file.upload(formData).then((r) => {
      setState(r.data.fileUid);
    });
  }
};

export default {};
