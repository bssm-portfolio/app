import httpClient from "@/apis";
import { Token } from "@/types/member.interface";
import { useQuery } from "@tanstack/react-query";

const handleGoogleOauth = (): Promise<Token> =>
  httpClient.login.google().then((r) => r.data);

const handleKakaoOauth = (): Promise<Token> =>
  httpClient.login.kakao().then((r) => r.data);

const getOauth = (platform: string): (() => Promise<Token>) => {
  const oauthRequest = {
    google: handleGoogleOauth,
    kakao: handleKakaoOauth,
    bsm: handleGoogleOauth,
  };

  switch (platform) {
    case "google":
      return oauthRequest.google;
    case "kakao":
      return oauthRequest.kakao;
    default:
      return oauthRequest.bsm;
  }
};

const useOauth = (platform: string) => {
  const { data } = useQuery<Token>(
    [`${platform} Oauth`, platform],
    getOauth(platform),
    { enabled: platform !== "" },
  );
  return data || { token: null, validity: null };
};

// eslint-disable-next-line import/prefer-default-export
export { useOauth };
