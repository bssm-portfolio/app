import httpClient, { HttpClient } from "@/apis/httpClient";
import { Storage } from "@/models/storage";
import { emptyUser, userState } from "@/store";
import { Member } from "@/types/member.interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const { data: userInfo, remove } = useQuery<Member>(
    ["member"],
    () => httpClient.member.self().then((res) => res.data),
    { enabled: !!Storage.getItem("ACCESS_TOKEN") },
  );

  const logout = () => {
    HttpClient.removeAccessToken();
    setUser(emptyUser);
    remove();
  };

  useEffect(() => {
    HttpClient.setAccessToken();
    if (userInfo) {
      setUser(userInfo);
    }
  }, [router.query, setUser, userInfo]);

  return { user, isLogined: !!userInfo, logout };
};

export default {};
