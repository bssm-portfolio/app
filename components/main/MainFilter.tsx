import InputButton from "../atoms/InputButton";

export default function MainFilter() {
  return (
    <div className="flex items-center justify-center gap-3">
      <InputButton>전체</InputButton>
      <InputButton>추천</InputButton>
      <InputButton>랭킹순</InputButton>
      <InputButton>3학년 랭킹순</InputButton>
      <InputButton>2학년 랭킹순</InputButton>
      <InputButton>1학년 랭킹순</InputButton>
      <InputButton>팔로잉</InputButton>
    </div>
  );
}
