import { ReactNode } from "react";

interface FrameProps {
  profile: ReactNode;
  portfiloList: ReactNode;
}

function Frame({ profile, portfiloList }: FrameProps) {
  return (
    <section className="flex">
      <div>{profile}</div>
      <div>{portfiloList}</div>
    </section>
  );
}

export default function MyPageLayout({ portfiloList, profile }: FrameProps) {
  return <Frame profile={profile} portfiloList={portfiloList} />;
}
