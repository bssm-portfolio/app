import { Member } from "@/types/member.interface";
import Button from "../atoms/Button";
import Avatar from "../common/Avatar";

export default function MyPageProfile({ userInfo }: { userInfo: Member }) {
  return (
    <div className="w-[282px] h-[540px] rounded-lg bg-primary-light_gray px-[52px] py-[30px]">
      <div>
        <Avatar imageUrl={userInfo.profileImageUrl} width={128} height={128} />
        <h2 className="font-bold text-2xl">{userInfo.name}</h2>
        <h4>{userInfo.job}</h4>
      </div>
      <div>
        <h4>{userInfo.memberRoleType}</h4>
        <h4>{userInfo.description}</h4>
        <h4>{userInfo.email}</h4>
      </div>
      <div>
        <Button varient="secondary">수정하기</Button>
      </div>
    </div>
  );
}
