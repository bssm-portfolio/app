import fixture from "@/fixtures";
import ProfilePortfolioList from "./ProfilePortfolioList";
import ProfileDescription from "./ProfileDescription";

export default function ProfileDetail() {
  return (
    <div className="flex gap-20">
      <ProfileDescription {...fixture.profileDescription} />
      <ProfilePortfolioList />
    </div>
  );
}
