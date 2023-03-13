import HeaderButton from "../atoms/HeaderButton";
import Avatar from "../common/Avatar";

interface ProfileDescriptionProps {
  avatarUrl: string;
  projectCount: number;
  followerCount: number;
  followingCount: number;
  username: string;
  role: string;
  description: string;
}

export default function ProfileDescription({
  avatarUrl,
  projectCount,
  followerCount,
  followingCount,
  username,
  role,
  description,
}: ProfileDescriptionProps) {
  return (
    <div className="flex flex-col items-center py-8 px-14 bg-primary-light_gray max-h-[33.75rem]">
      <Avatar className="mb-5" imageUrl={avatarUrl} sizes="128px" />
      <h2 className="text-2xl font-bold mb-1">{username}</h2>
      <h3 className="text-xs font-bold mb-5">{role}</h3>
      <div className="w-full flex font-bold">
        <span className="mr-3">프로젝트 수</span>
        <span>{projectCount}</span>
      </div>
      <div className="w-full flex font-bold">
        <span className="mr-3">팔로워 수</span>
        <span>{followerCount}</span>
      </div>
      <div className="w-full flex font-bold mb-5">
        <span className="mr-3">팔로잉 수</span>
        <span>{followingCount}</span>
      </div>
      <pre className="overflow-y-scroll max-w-[17.625rem] whitespace-pre-wrap text-xs mb-5">
        {description}
      </pre>
      <HeaderButton>수정하기</HeaderButton>
    </div>
  );
}
