import { ReactNode } from "react";

interface FrameProps {
  profile: ReactNode;
  portfiloList: ReactNode;
}

function Frame({ profile, portfiloList }: FrameProps) {
  return (
    <section className="flex px-[8.375rem] pb-16">
      <div>{profile}</div>
      <div>{portfiloList}</div>
    </section>
  );
}

export default function ProfilePageLayout({
  portfiloList,
  profile,
}: FrameProps) {
  return <Frame profile={profile} portfiloList={portfiloList} />;
}
