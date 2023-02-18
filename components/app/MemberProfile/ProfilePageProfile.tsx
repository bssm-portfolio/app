import Button from "@/components/atoms/Button";
import Avatar from "@/components/common/Avatar";
import { Member } from "@/types/member.interface";
import { useRouter } from "next/router";

interface MemberPageProfileProps {
  userInfo: Member;
  isMypage?: boolean;
}
export default function MemberPageProfile({
  userInfo,
  isMypage = false,
}: MemberPageProfileProps) {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col w-[17.625rem] h-[33.75rem] rounded-lg bg-primary-light_gray px-[3.25rem] py-[1.875rem]">
        <div className="flex flex-col items-center">
          <Avatar
            imageUrl={userInfo.profileImageUrl}
            width={128}
            height={128}
          />
          <h2 className="font-bold text-2xl mt-5">{userInfo.name}</h2>
          <h4 className="font-bold mt-1 text-xs">
            {userInfo.job ?? "앱개발자"}
          </h4>
        </div>
        <div className="mt-5">
          <h4 className="font-bold text-xs mb-2">프로젝트 수 {0}</h4>
          <h4 className="font-bold text-xs mb-2">팔로워 수 {0}</h4>
          <h4 className="font-bold text-xs">팔로잉 수 {0}</h4>
          <h4 className="mt-5 text-xsmall">
            {userInfo.description ?? "안녕하세요 반갑습니다"}
          </h4>
          <h4 className="text-2xsmall">{userInfo.email}</h4>
        </div>
        {isMypage && (
          <div className="flex justify-center mt-auto">
            <Button
              varient="secondary"
              className="border border-black !rounded-full bg-white py-2 px-8"
            >
              수정하기
            </Button>
          </div>
        )}
      </div>
      {isMypage ? (
        <div className="flex flex-col gap-4 mt-8">
          <Button
            className="!rounded-[0.625rem]"
            onClick={() => router.push("/contents")}
          >
            채널 콘텐츠 관리
          </Button>
          <Button
            className="bg-primary-dark_gray !rounded-[0.625rem]"
            onClick={() => router.push("/mypage/edit")}
          >
            내 정보 관리
          </Button>
        </div>
      ) : (
        <Button className="">팔로우</Button>
      )}
    </>
  );
}
