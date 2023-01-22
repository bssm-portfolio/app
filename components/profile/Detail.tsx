import fixture from "@/fixtures";
import PortfolioList from "../main/PortfolioList";
import ProfileDescription from "./ProfileDescription";

export default function ProfileDetail() {
  return (
    <div className="flex gap-20">
      <ProfileDescription {...fixture.profileDescription} />
      <PortfolioList />
    </div>
  );
}
