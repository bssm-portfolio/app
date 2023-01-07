import { modalState } from "@/store";
import { ModalState } from "@/types/modal.interface";
import { useRecoilState } from "recoil";

const useModal = () => {
  const [, setModal] = useRecoilState(modalState);

  const openModal = ({ title, content }: Omit<ModalState, "visible">) => {
    setModal({
      visible: true,
      title,
      content,
    });
  };

  const closeModal = () => {
    setModal({
      title: "",
      content: null,
      visible: false,
    });
  };

  return { openModal, closeModal };
};

export default useModal;
