import { userState } from "@/store";
import { useRecoilState } from "recoil";
import HeaderView from "./View";

export default function Header() {
  const [user] = useRecoilState(userState);
  return <HeaderView avatarUrl={user.avatarUrl} />;
}
