import httpClient from "@/apis";
import { Platform, Token } from "@/types/member.interface";
import { useQuery } from "@tanstack/react-query";

const getOauth = (
  platform: Platform,
  authCode: string,
): (() => Promise<Token>) => {
  const oauthRequestList = {
    google: () => httpClient.oauth.google({ authCode }).then((d) => d.data),
    kakao: () => httpClient.oauth.kakao({ authCode }).then((d) => d.data),
    bsm: () => httpClient.oauth.bsm({ authCode }).then((d) => d.data),
  };
  return oauthRequestList[platform];
};

const useOauth = (platform: Platform, authCode: string) => {
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
