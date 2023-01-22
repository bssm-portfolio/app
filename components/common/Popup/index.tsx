import usePopup from "@/hooks/usePopup";
import popupState from "@/store/popup";
import { useRecoilState } from "recoil";
import PopupView from "./View";

export default function Popup() {
  const [popup] = useRecoilState(popupState);
  const { closePopup } = usePopup();

  return <PopupView {...popup} onClose={closePopup} />;
}
