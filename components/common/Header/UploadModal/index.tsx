import { modalState } from "@/store";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import FileUploadView from "./FileUploadView";
import FormView from "./FormView";
import Navigator from "./Navigator";
import SubmitView from "./SubmitView";

const MAX_NAVIGATOR_LENGTH = 3;
export default function UploadModal() {
  const [pageIndex, setPageIndex] = useState(0);

  const goNext = () =>
    setPageIndex((idx) => (idx < MAX_NAVIGATOR_LENGTH ? idx + 1 : idx));
  const goPrev = () => setPageIndex((idx) => (idx > 0 ? idx - 1 : idx));
  const [, setModal] = useRecoilState(modalState);
  const onSubmit = () => {
    setModal({
      title: "",
      content: null,
      visible: false,
    });
  };

  return (
    <>
      {pageIndex === 0 && <FileUploadView />}
      {pageIndex === 1 && <FormView />}
      {pageIndex === 2 && <SubmitView />}
      <Navigator
        goNext={goNext}
        goPrev={pageIndex > 0 ? goPrev : null}
        onSubmit={pageIndex === MAX_NAVIGATOR_LENGTH - 1 ? onSubmit : null}
      />
    </>
  );
}
