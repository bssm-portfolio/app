import { PortfolioListType } from "@/types/portfolio.interface";
import { Skill } from "@/types/skill.interface";
import classNames from "classnames";
import Chip from "./Chip";

interface ChipGroupProps {
  skillList: Skill[];
  type?: PortfolioListType;
  className?: string;
  selectedSkills?: Skill[];
  setSelectedSkills?: (skill: Skill) => void;
}

export default function ChipGroup({
  skillList,
  type = "main",
  className = "",
  selectedSkills,
  setSelectedSkills,
}: ChipGroupProps) {
  const isShorten = ["main", "portfolio"].includes(type);
  const getFilteredSkillList = () => {
    if (isShorten) return skillList.filter((_, idx) => idx < 3);
    return skillList;
  };

  return (
    <Chip.Group className={classNames(className, "pt-2")} type={type}>
      {getFilteredSkillList().map((skillData) => (
        <Chip.Item
          type={type}
          key={skillData.skillId}
          {...(type === "upload" && {
            selected: selectedSkills?.some(
              (selectedSkill) => selectedSkill.skillId === skillData.skillId,
            ),
            onClick: () => setSelectedSkills?.(skillData),
          })}
        >
          {skillData.skillName}
        </Chip.Item>
      ))}
      {isShorten && skillList.length >= 4 && (
        <Chip.Item type={type}>더보기</Chip.Item>
      )}
    </Chip.Group>
  );
}
