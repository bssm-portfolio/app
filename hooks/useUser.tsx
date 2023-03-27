import httpClient, { HttpClient } from "@/apis/httpClient";
import KEY from "@/models/key";
import { Storage } from "@/models/storage";
import { emptyUser, userState } from "@/store";
import { Member } from "@/types/member.interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import useModal from "./useModal";
import useWindow from "./useWindow";

interface UseUserOptions {
  authorizedPage?: boolean;
}
const useUser = (options?: UseUserOptions) => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const { openModal, visible } = useModal();
  const { isWindow } = useWindow();
  const {
    data: userInfo,
    remove,
    isLoading,
  } = useQuery<Member>(
    [KEY.USER],
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
    if (options?.authorizedPage && !isLoading && !userInfo && !visible) {
      openModal({
        title: "로그인",
        content: (
          <p className="mb-5">
            로그인이 필요한 페이지입니다. 메인 페이지로 돌아갑니다.
          </p>
        ),
        onClose: () => {
          if (isWindow) window.location.href = "/";
        },
      });
    }
  }, [options, userInfo, isLoading, router, visible, openModal, isWindow]);

  useEffect(() => {
    if (
      userInfo?.phone === null &&
      !["/account/signup", "/docs/privacy"].includes(router.asPath)
    ) {
      router.push("/account/signup");
    }
  }, [userInfo?.phone, router]);

  return { user, isLogined: !!userInfo, logout };
};

export default useUser;
