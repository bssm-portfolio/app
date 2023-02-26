import { modalState } from "@/store";
import { ModalState } from "@/types/modal.interface";
import { useCallback } from "react";
import { useRecoilState } from "recoil";

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = useCallback(
    (modalData: ModalState) => {
      setModal({
        ...modalData,
        visible: true,
      });
    },
    [setModal],
  );

  const closeModal = useCallback(() => {
    setModal({
      title: "",
      content: null,
      visible: false,
    });
  }, [setModal]);

  return { openModal, closeModal, visible: !!modal.visible };
};

export default useModal;
