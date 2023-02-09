import httpClient from "@/apis";
import { OAuthPlatform, Token } from "@/types/member.interface";
import { useQuery } from "@tanstack/react-query";

const getOauth = (
  platform: OAuthPlatform,
  authCode: string,
): (() => Promise<Token>) => {
  return () =>
    httpClient.oauth
      .post({ code: authCode, clientType: platform.toUpperCase() })
      .then((d) => d.data);
};

const useOauth = (platform: OAuthPlatform, authCode: string) => {
  const { data } = useQuery<Token>(
    [`${platform} oauth`, authCode],
    getOauth(platform, authCode),
    {
      enabled: !!authCode,
    },
  );
  return data || { token: "", validity: "" };
};

// eslint-disable-next-line import/prefer-default-export
export { useOauth };
