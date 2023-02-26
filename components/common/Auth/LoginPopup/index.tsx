import LoginButton from "@/components/atoms/LoginButton";
import BsmIcon from "@/components/Icon/BsmIcon";
import BssmIcon from "@/components/Icon/BssmIcon";
import GoogleIcon from "@/components/Icon/GoogleIcon";
import KakaoIcon from "@/components/Icon/KakaoIcon";
import config from "@/config";
import { OAuthPlatform } from "@/types/oauth.interface";
import { useRouter } from "next/router";

export default function LoginPopupView() {
  const router = useRouter();

  const handleOauth = (platform: OAuthPlatform) => {
    const oauthCallbackUrlList = {
      google: `${config.baseURL}/oauth2/authorization/google`,
      kakao: `${config.baseURL}/oauth2/authorization/kakao`,
      bsm: "https://auth.bssm.kro.kr/oauth?clientId=17283d0f&redirectURI=http://localhost:3000/oauth/callback/bsm",
    };
    return router.push(oauthCallbackUrlList[platform]);
  };

  return (
    <div className="pt-[6.1rem] pb-20">
      <div className="flex flex-col items-center">
        <BssmIcon />
        <h2 className="break-keep text-xlarge text-primary-dark_gray font-bold w-[17.5rem] text-center mt-10 mb-20 leading-[2.5rem]">
          소마고 홈페이지에 오신 것을 환영합니다.
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        <LoginButton value="kakao" onClick={() => handleOauth("kakao")}>
          <KakaoIcon className="mr-2" /> 카카오로 로그인
        </LoginButton>
        <LoginButton value="google" onClick={() => handleOauth("google")}>
          <GoogleIcon className="mr-2" /> 구글로 로그인
        </LoginButton>
        <LoginButton value="bsm" onClick={() => handleOauth("bsm")}>
          <BsmIcon className="mr-2" /> BSM 계정으로 로그인
        </LoginButton>
      </div>
    </div>
  );
}
