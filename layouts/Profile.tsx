import styleConfig from "@/config/style";
import { ReactNode } from "react";

interface FrameProps {
  profile: ReactNode;
  portfiloList: ReactNode;
}

function Frame({ profile, portfiloList }: FrameProps) {
  return (
    <section className="flex justify-center min-h-[calc(100vh-4.625rem)]">
      <div className={`flex pb-16 mt-10 ${styleConfig.desktopWidth}`}>
        <div>{profile}</div>
        <div>{portfiloList}</div>
      </div>
    </section>
  );
}

export default function ProfileLayout({ portfiloList, profile }: FrameProps) {
  return <Frame profile={profile} portfiloList={portfiloList} />;
}
