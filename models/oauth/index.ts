import httpClient from "@/apis";
import { Platform, Token } from "@/types/oauth.interface";
import { useQuery } from "@tanstack/react-query";

const getOauth = (
  platform: Platform,
  authCode: string,
): (() => Promise<Token>) => {
  return () => httpClient.oauth[platform]({ authCode }).then((d) => d.data);
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
