import useModal from "@/hooks/useModal";
import { userState } from "@/store";
import { useRecoilState } from "recoil";
import UploadModal from "./UploadModal";
import HeaderView from "./View";

export default function Header() {
  const [user] = useRecoilState(userState);
  const { openModal, closeModal } = useModal();
  const isLogined = true;

  const dummyFn = () => 0;
  return (
    <HeaderView
      avatarUrl={user.avatarUrl}
      isLogined={isLogined}
      onLeftButtonClick={dummyFn}
      onRightButtonClick={
        isLogined
          ? () =>
              openModal({
                title: "업로드",
                content: <UploadModal closeModal={closeModal} />,
              })
          : dummyFn
      }
    />
  );
}
