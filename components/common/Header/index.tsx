import useModal from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import UploadModal from "../../app/UploadModal";
import LoginPopupView from "../Login/LoginPopup";
import HeaderView from "./View";

export default function Header() {
  const { user, isLogined, logout } = useUser();
  const { openModal, closeModal } = useModal();
  const openLoginModal = () =>
    openModal({
      content: <LoginPopupView />,
    });
  const openUploadModal = () =>
    openModal({
      title: "업로드",
      content: <UploadModal closeModal={closeModal} />,
    });

  return (
    <HeaderView
      avatarUrl={user.profileImageUrl}
      isLogined={isLogined}
      memberId={user.memberId}
      onLeftButtonClick={isLogined ? logout : openLoginModal}
      onRightButtonClick={isLogined ? openUploadModal : openLoginModal}
    />
  );
}
