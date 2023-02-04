import httpClient from "@/apis";
import fixture from "@/fixtures";
import { User } from "@/types/user.interface";
import { useQuery } from "@tanstack/react-query";

const useAuthUser = () => {
  const { data } = useQuery<User>([], () =>
    httpClient.member.self({}).then((r) => r.data),
  );
  return data || fixture.user;
};

export default useAuthUser;
