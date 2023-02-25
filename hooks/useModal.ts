import { modalState } from "@/store";
import { ModalState } from "@/types/modal.interface";
import { useRecoilState } from "recoil";

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = ({
    title,
    content,
    onClose,
  }: Omit<ModalState, "visible">) => {
    setModal({
      visible: true,
      title,
      content,
      onClose,
    });
  };

  const closeModal = () => {
    setModal({
      title: "",
      content: null,
      visible: false,
    });
  };

  return { openModal, closeModal, visible: !!modal.visible };
};

export default useModal;
