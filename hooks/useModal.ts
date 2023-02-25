import { modalState } from "@/store";
import { ModalState } from "@/types/modal.interface";
import { useCallback } from "react";
import { useRecoilState } from "recoil";

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = useCallback(
    ({ title, content, menualClose, onClose }: Omit<ModalState, "visible">) => {
      setModal({
        visible: true,
        title,
        content,
        menualClose,
        onClose,
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
