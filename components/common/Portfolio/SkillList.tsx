import ChipGroup from "@/components/atoms/ChipGroup";
import { PortfolioListType } from "@/types/portfolio.interface";
import { Skill } from "@/types/skill.interface";

interface ChipGroupProps {
  skillList: Skill[];
  className?: string;
  type?: PortfolioListType;
  isShorten?: boolean;
}

export default function SkillList({ skillList, ...props }: ChipGroupProps) {
  return (
    <ChipGroup
      items={skillList.map((skill) => ({
        id: skill.skillId,
        label: skill.skillName,
      }))}
      {...props}
    />
  );
}
