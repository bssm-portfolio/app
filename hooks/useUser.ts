import httpClient, { HttpClient } from "@/apis/httpClient";
import { Storage } from "@/models/storage";
import { emptyUser, userState } from "@/store";
import { Member } from "@/types/member.interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

interface UseUserOptions {
  authorizedPage?: boolean;
}
const useUser = (options?: UseUserOptions) => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const {
    data: userInfo,
    remove,
    isFetching,
  } = useQuery<Member>(
    ["get userData"],
    async () => {
      HttpClient.setAccessToken();
      return httpClient.member.self().then((r) => r.data);
    },
    { enabled: !!Storage.getItem("ACCESS_TOKEN") },
  );

  const logout = () => {
    HttpClient.removeAccessToken();
    setUser(emptyUser);
    remove();
  };

  useEffect(() => {
    if (userInfo) setUser(userInfo);
  }, [router.query, setUser, userInfo]);

  useEffect(() => {
    if (options?.authorizedPage && !isFetching && !userInfo) {
      // TODO: alert 제거
      alert("로그인이 필요한 페이지입니다.");
      router.push("/");
    }
  }, [options, router, userInfo, isFetching]);

  return { user, isLogined: !!userInfo, logout };
};

export default useUser;
