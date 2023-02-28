import httpClient from "@/apis";
import useOverlay from "@/hooks/useOverlay";
import KEY from "@/models/key";
import { PortfolioForm, PortfolioType } from "@/types/portfolio.interface";
import { Skill } from "@/types/skill.interface";
import { getFileUidByFileUpload } from "@/utils/file";
import { getErrorProperty } from "@/utils/input";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
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
      videoFile && (await getFileUidByFileUpload(videoFile, openToast));
    const thumbnailFileUid =
      thumbnailFile && (await getFileUidByFileUpload(thumbnailFile, openToast));

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
        queryClient.invalidateQueries([KEY.PORTFOLIO_LIST]);
        queryClient.invalidateQueries([KEY.MY_PORTFOLIO_LIST]);
        queryClient.invalidateQueries([KEY.PORTFOLIO_LIST_BY_ID]);
        openToast("포트폴리오 업로드에 성공하였습니다");
        closeModal();
      })
      .catch((error) =>
        openToast(error.response.data.message, {
          type: "danger",
        }),
      );
  };

  const onInValid: SubmitErrorHandler<PortfolioForm> = (inValidData) => {
    openToast(
      `${getErrorProperty<PortfolioForm>(inValidData)}을(를) 확인해주세요.`,
      {
        type: "danger",
      },
    );
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
        videoFile={videoFile}
        setVideoFile={setVideoFile}
        thumbnailFile={thumbnailFile}
        setThumbnailFile={setThumbnailFile}
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
        className="mt-auto pb-6"
        goNext={goNext}
        goPrev={pageIndex > 0 ? goPrev : null}
        isLast={pageIndex === MAX_NAVIGATOR_LENGTH - 1}
      />
    </form>
  );
}
