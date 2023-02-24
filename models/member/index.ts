import httpClient from "@/apis";
import fixture from "@/fixtures";
import { Member } from "@/types/member.interface";
import { useQuery } from "@tanstack/react-query";
import KEY from "../key";

const useMember = (memberId: number) => {
  const { data } = useQuery<Member>(
    [KEY.MEMBER],
    () =>
      httpClient.member
        .getById({ params: { id: memberId } })
        .then((r) => r.data),
    {
      enabled: !!memberId,
    },
  );
  return { data: data || fixture.user };
};

export default useMember;
