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
          <div className="w-full flex font-bold">
            <span className="mr-3">프로젝트 수</span>
            <span>{userInfo.portfolioCount}</span>
          </div>
          <div className="w-full flex font-bold">
            <span className="mr-3">팔로워 수</span>
            <span>{userInfo.followerCount}</span>
          </div>
          <div className="w-full flex font-bold mb-5">
            <span className="mr-3">팔로잉 수</span>
            <span>{userInfo.followingCount}</span>
          </div>
          <pre className="overflow-y-scroll max-w-[17.625rem] whitespace-pre-wrap text-xs mb-5">
            {userInfo.description}
          </pre>
        </div>
        <div className="flex justify-center mt-auto">
          {isMypage ? (
            <Button
              varient="secondary"
              className="border border-black !rounded-full !bg-white py-2 px-8"
            >
              수정하기
            </Button>
          ) : (
            <Button
              varient="secondary"
              className="w-40 !rounded-full !bg-somago_yellow !py-2"
            >
              팔로우
            </Button>
          )}
        </div>
      </div>
      {isMypage && (
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
      )}
    </>
  );
}
