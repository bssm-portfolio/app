import httpClient from "@/apis";
import { PortfolioForm } from "@/types/portfolio.interface";
import classNames from "classnames";
import React, { useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import FileUploadView from "./FileUploadView";
import FormView from "./FormView";
import Navigator from "./Navigator";
import SubmitView from "./SubmitView";

interface UploadModalProps {
  closeModal: () => void;
}

const MAX_NAVIGATOR_LENGTH = 3;

export default function UploadModal({ closeModal }: UploadModalProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<PortfolioForm>();
  const onValid: SubmitHandler<PortfolioForm> = async (data) => {
    console.log("submitted data : ", data);
    await httpClient.portfolio.post({
      ...data,
      portfolioType: "URL",
      skillList: [],
      contributorIdList: [],
    });
    closeModal();
  };
  const onInvalid: SubmitErrorHandler<PortfolioForm> = (data) => {
    console.error("invalid data : ", data);
  };

  const goNext = () =>
    setPageIndex((idx) => (idx < MAX_NAVIGATOR_LENGTH ? idx + 1 : idx));
  const goPrev = () => setPageIndex((idx) => (idx > 0 ? idx - 1 : idx));

  return (
    <form
      className="h-40 flex flex-col"
      onSubmit={handleSubmit(onValid, onInvalid)}
    >
      <FileUploadView
        className={classNames({ hidden: pageIndex !== 0 })}
        register={register}
      />
      <FormView
        className={classNames({ hidden: pageIndex !== 1 })}
        register={register}
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
