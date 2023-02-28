import { useEffect } from "react";
import SignupPopupView from "@/components/common/Auth/SignupPopup";
import useModal from "@/hooks/useModal";
import { NextSeo, NextSeoProps } from "next-seo";

export default function Home() {
  const { openModal } = useModal();
  const seoConfig: NextSeoProps = {
    title: "회원가입",
    description: "BSSM Portfolio 회원가입",
  };

  useEffect(() => {
    openModal({
      title: "회원가입을 위해 아래의 정보를 입력해주세요.",
      content: <SignupPopupView />,
      menualClose: true,
    });
  }, [openModal]);

  return <NextSeo {...seoConfig} />;
}
