import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import FileUploadView from "./FileUploadView";
import FormView from "./FormView";
import Navigator from "./Navigator";
import SubmitView from "./SubmitView";

interface UploadModalProps {
  closeModal: () => void;
}

const MAX_NAVIGATOR_LENGTH = 3;
const onSubmit = (closeModal: () => void, router: NextRouter) => {
  closeModal();
  router.push("/contents");
};

export default function UploadModal({ closeModal }: UploadModalProps) {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);

  const goNext = () =>
    setPageIndex((idx) => (idx < MAX_NAVIGATOR_LENGTH ? idx + 1 : idx));
  const goPrev = () => setPageIndex((idx) => (idx > 0 ? idx - 1 : idx));

  return (
    <div className="h-40">
      {pageIndex === 0 && <FileUploadView />}
      {pageIndex === 1 && <FormView />}
      {pageIndex === 2 && <SubmitView />}
      <Navigator
        goNext={goNext}
        goPrev={pageIndex > 0 ? goPrev : null}
        onSubmit={
          pageIndex === MAX_NAVIGATOR_LENGTH - 1
            ? () => onSubmit(closeModal, router)
            : null
        }
      />
    </div>
  );
}
