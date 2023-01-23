import useModal from "@/hooks/useModal";
import LoginPopupView from "./LoginPopup";

export default function LoginPopup() {
  const { openModal } = useModal();
  return (
    <button
      type="button"
      onClick={() => {
        openModal({
          content: <LoginPopupView />,
        });
      }}
    >
      로그인 팝업
    </button>
  );
}
