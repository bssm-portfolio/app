import popupState from "@/store/popup";
import { PopupState } from "@/types/popup.interface";
import { useRecoilState } from "recoil";

const usePopup = () => {
  const [, setPopup] = useRecoilState(popupState);
  const openPopup = ({ content }: Omit<PopupState, "visible">) => {
    setPopup({ visible: true, content });
  };

  const closePopup = () => {
    setPopup({ visible: false, content: null });
  };

  return { openPopup, closePopup };
};

export default usePopup;
