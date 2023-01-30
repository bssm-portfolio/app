import httpClient from "@/apis";
import { Token } from "@/types/member.interface";
import { useQuery } from "@tanstack/react-query";

const useGoogleOauth = () => {
  const { data } = useQuery<Token>(["google Oauth"], () =>
    httpClient.login.google().then((r) => r.data),
  );
  return data || { token: null, validity: null };
};

// eslint-disable-next-line import/prefer-default-export
export { useGoogleOauth };
