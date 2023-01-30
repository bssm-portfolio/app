import httpClient from "@/apis";
import { Token } from "@/types/member.interface";
import { useQuery } from "@tanstack/react-query";

const useGoogleOauth = () => {
  const { data } = useQuery<Token>(["google Oauth"], () =>
    httpClient.login;
  );
  return data || { pagination: null, list: [] };
};

// eslint-disable-next-line import/prefer-default-export
export { useGoogleOauth };
