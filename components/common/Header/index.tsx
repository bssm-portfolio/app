import useModal from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import UploadModal from "../../app/UploadModal";
import LoginPopupView from "../Auth/LoginPopup";
import HeaderView from "./View";

export default function Header() {
  const { user: userInfo, isLogined, logout } = useUser();
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
      avatarUrl={userInfo.profileImageUrl}
      isLogined={isLogined}
      memberId={userInfo.memberId}
      onLeftButtonClick={isLogined ? logout : openLoginModal}
      onRightButtonClick={isLogined ? openUploadModal : openLoginModal}
    />
  );
}
