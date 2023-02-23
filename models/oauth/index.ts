import { useQuery } from "@tanstack/react-query";
import httpClient from "@/apis";
import { OAuthPlatform, Token } from "@/types/oauth.interface";
import { OAUTH_KEY } from "../key";

const getOauth = (
  platform: OAuthPlatform,
  authCode: string,
): (() => Promise<Token>) => {
  return () =>
    httpClient.oauth
      .post({ code: authCode, clientType: platform.toUpperCase() })
      .then((r) => r.data);
};

const useOauth = (platform: OAuthPlatform, authCode: string) => {
  const { data } = useQuery<Token>(
    [OAUTH_KEY, authCode],
    getOauth(platform, authCode),
    {
      enabled: !!authCode,
    },
  );
  return data || { token: "", validity: "" };
};

export default useOauth;
