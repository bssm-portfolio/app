import httpClient from "@/apis";
import fixture from "@/fixtures";
import useOverlay from "@/hooks/useOverlay";
import { Member } from "@/types/member.interface";
import { useQuery } from "@tanstack/react-query";
import KEY from "../key";

const useMember = (memberId: number) => {
  const { openToast } = useOverlay();
  const { data } = useQuery<Member>(
    [KEY.MEMBER],
    () =>
      httpClient.member
        .getById({ params: { id: memberId } })
        .then((r) => r.data)
        .catch(() => openToast("유저 정보를 불러오지 못했습니다.")),
    {
      enabled: !!memberId,
    },
  );
  return { data: data || fixture.user };
};

export default useMember;
