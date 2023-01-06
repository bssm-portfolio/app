import useModal from "@/hooks/useModal";
import { modalState } from "@/store/modal";
import { useRecoilState } from "recoil";
import ModalView from "./View";

export default function Modal() {
  const [modal] = useRecoilState(modalState);
  const { closeModal } = useModal();

  return <ModalView {...modal} onClose={closeModal} />;
}
