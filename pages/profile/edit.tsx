import ProfileEdit from "@/components/profile/ProfileEdit";
import ProfileEditLayout from "@/layouts/ProfileEdit";
import useUser from "@/hooks/useUser";

export default function ProfileEditPage() {
  const { user: userInfo } = useUser({ authorizedPage: true });
  return <ProfileEditLayout app={<ProfileEdit userInfo={userInfo} />} />;
}
