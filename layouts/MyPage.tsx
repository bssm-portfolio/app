import { ReactNode } from "react";
import { Header } from "@/components";

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
  return (
    <>
      <Header />
      <Frame profile={profile} portfiloList={portfiloList} />
    </>
  );
}
