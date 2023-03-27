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

type FileType = "image" | "video";
export const getFileUidByFileUpload = async (
  file: File,
  openToast: OpenToastType,
  fileType: FileType,
) => {
  const getFileUploadRequest = () => {
    if (fileType === "image")
      return httpClient.fileUpload.image(getFormData(file));
    return httpClient.fileUpload.video(getFormData(file));
  };

  return getFileUploadRequest()
    .then((r) => {
      openToast("파일 업로드에 성공하였습니다.");
      return r.data.fileUid;
    })
    .catch((error) =>
      openToast(error.response.data.message, { type: "danger" }),
    );
};
