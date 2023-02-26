import httpClient from "@/apis";
import useOverlay from "@/hooks/useOverlay";
import KEY from "@/models/key";
import { PortfolioForm, PortfolioType } from "@/types/portfolio.interface";
import { Skill } from "@/types/skill.interface";
import { getFormData } from "@/utils/file";
import { getErrorProperty } from "@/utils/input";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useState } from "react";
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  FieldErrors,
  FieldErrorsImpl,
} from "react-hook-form";
import FileUploadView from "./FileUploadView";
import FormView from "./Form";
import Navigator from "./Navigator";
import SubmitView from "./SubmitView";

interface UploadModalProps {
  closeModal: () => void;
}

const MAX_NAVIGATOR_LENGTH = 3;

export default function UploadModal({ closeModal }: UploadModalProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [videoFile, setVideoFile] = useState<File>();

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<PortfolioForm>();
  const queryClient = useQueryClient();
  const { openToast } = useOverlay();

  const onValid: SubmitHandler<PortfolioForm> = async (data) => {
    const videoFileUid =
      videoFile &&
      (await httpClient.file.upload(getFormData(videoFile))).data.fileUid;
    const thumbnailFileUid =
      thumbnailFile &&
      (await httpClient.file.upload(getFormData(thumbnailFile))).data.fileUid;

    const getPortfolioType = (): PortfolioType => {
      if (data.portfolioUrl.length > 0 && videoFileUid) {
        return "ALL";
      }
      if (videoFileUid) {
        return "VIDEO";
      }
      return "URL";
    };

    await httpClient.portfolio
      .post({
        ...data,
        portfolioType: getPortfolioType(),
        skillList: selectedSkills,
        contributorIdList: [],
        videoFileUid,
        thumbnailFileUid,
      })
      .then(() => {
        closeModal();
        queryClient.invalidateQueries({
          queryKey: [KEY.PORTFOLIO_LIST],
        });
      });
  };

  const onInValid: SubmitErrorHandler<PortfolioForm> = (inValidData) => {
    console.log(inValidData);
    console.log(getErrorProperty<PortfolioForm>(inValidData));

    openToast(`를 확인해주세요.`, {
      type: "danger",
    });
  };

  const goNext = () =>
    setPageIndex((idx) => (idx < MAX_NAVIGATOR_LENGTH ? idx + 1 : idx));
  const goPrev = () => setPageIndex((idx) => (idx > 0 ? idx - 1 : idx));

  return (
    <form
      className="h-39 flex flex-col"
      onSubmit={handleSubmit(onValid, onInValid)}
    >
      <FileUploadView
        className={classNames({ hidden: pageIndex !== 0 })}
        register={register}
        setThumbnailFile={setThumbnailFile}
        setVideoFile={setVideoFile}
      />
      <FormView
        className={classNames({ hidden: pageIndex !== 1 })}
        register={register}
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
      />
      <SubmitView
        className={classNames({ hidden: pageIndex !== 2 })}
        register={register}
      />
      <Navigator
        className="mt-auto mb-6"
        goNext={goNext}
        goPrev={pageIndex > 0 ? goPrev : null}
        isLast={pageIndex === MAX_NAVIGATOR_LENGTH - 1}
      />
    </form>
  );
}
