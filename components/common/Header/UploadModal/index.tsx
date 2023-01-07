import React, { useState } from "react";
import FileUploadView from "./FileUploadView";
import FormView from "./FormView";
import Navigator from "./Navigator";

const MAX_NAVIGATOR_LENGTH = 3;
export default function UploadModal() {
  const [pageIndex, setPageIndex] = useState(0);

  const goNext = () =>
    setPageIndex((idx) => (idx < MAX_NAVIGATOR_LENGTH ? idx + 1 : idx));
  const goPrev = () => setPageIndex((idx) => (idx > 0 ? idx - 1 : idx));
  const onSubmit = () => console.log("submit");

  return (
    <>
      {pageIndex === 0 && <FileUploadView />}
      {pageIndex === 1 && <FormView />}
      <Navigator
        goNext={goNext}
        goPrev={pageIndex > 0 ? goPrev : null}
        onSubmit={pageIndex === MAX_NAVIGATOR_LENGTH - 1 ? onSubmit : null}
      />
    </>
  );
}
