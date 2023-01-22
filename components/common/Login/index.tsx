import usePopup from "@/hooks/usePopup";
import LoginPopupView from "./LoginPopup";

export default function LoginPopup() {
  const { openPopup } = usePopup();
  return (
    <button
      type="button"
      onClick={() => {
        openPopup({
          content: <LoginPopupView />,
        });
      }}
    >
      로그인 팝업
    </button>
  );
}
