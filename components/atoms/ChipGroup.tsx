import { PortfolioListType } from "@/types/portfolio.interface";
import { Skill } from "@/types/skill.interface";
import Chip from "./Chip";

interface ChipGroupProps {
  skillList: Skill[];
  type?: PortfolioListType;
}

export default function ChipGroup({
  skillList,
  type = "main",
}: ChipGroupProps) {
  const getFilteredSkillList = () => {
    if (type !== "detail") return skillList.filter((_, idx) => idx < 3);
    return skillList;
  };

  return (
    <Chip.Group className="pt-2" type={type}>
      {getFilteredSkillList().map((skillData) => (
        <Chip.Item type={type} key={skillData.skillId}>
          {skillData.skillName}
        </Chip.Item>
      ))}
      {type !== "detail" && skillList.length > 2 && (
        <Chip.Item type={type}>더보기</Chip.Item>
      )}
    </Chip.Group>
  );
}
