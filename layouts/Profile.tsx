import { ReactNode } from "react";

interface FrameProps {
  profile: ReactNode;
  portfiloList: ReactNode;
}

function Frame({ profile, portfiloList }: FrameProps) {
  return (
    <section className="flex px-[8.375rem] pb-16 pt-10 min-h-[calc(100vh-5.125rem)]">
      <div>{profile}</div>
      <div>{portfiloList}</div>
    </section>
  );
}

export default function ProfileLayout({ portfiloList, profile }: FrameProps) {
  return <Frame profile={profile} portfiloList={portfiloList} />;
}
