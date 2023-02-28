import httpClient from "@/apis";
import config from "@/config";
import { S3File } from "@/types/file.interface";
import { OpenToastType } from "@/types/toast.interface";

export const getFileDownloadUrl = (file: S3File) => {
  return `${config.baseURL}/api/file/download/${file.fileUid}`;
};

export const getFormData = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
};

export const getFileUidByFileUpload = async (
  file: File,
  openToast: OpenToastType,
) => {
  return httpClient.file
    .upload(getFormData(file))
    .then(({ data }) => {
      openToast("파일 업로드에 성공하였습니다.");
      return data.fileUid;
    })
    .catch(() =>
      openToast("파일 업로드에 실패하였습니다.", { type: "danger" }),
    );
};
