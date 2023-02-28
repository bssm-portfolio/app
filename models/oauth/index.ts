import { useQuery } from "@tanstack/react-query";
import httpClient from "@/apis";
import { OAuthPlatform, Token } from "@/types/oauth.interface";
import useOverlay from "@/hooks/useOverlay";
import { OpenToastType } from "@/types/toast.interface";
import KEY from "../key";

const getOauth = (
  platform: OAuthPlatform,
  authCode: string,
  openToast: OpenToastType,
): (() => Promise<Token>) => {
  return () =>
    httpClient.oauth
      .post({ code: authCode, clientType: platform.toUpperCase() })
      .then((r) => r.data)
      .catch(() => openToast("인증 정보를 불러오지 못했습니다."));
};

const useOauth = (platform: OAuthPlatform, authCode: string) => {
  const { openToast } = useOverlay();
  const { data } = useQuery<Token>(
    [KEY.OAUTH, authCode],
    getOauth(platform, authCode, openToast),
    {
      enabled: !!authCode,
    },
  );
  return data || { token: "", validity: "" };
};

export default useOauth;
