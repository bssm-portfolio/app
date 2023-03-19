import ChipGroup, { ChipItem } from "@/components/atoms/ChipGroup";
import { Skill } from "@/types/skill.interface";
import { Dispatch, SetStateAction } from "react";

interface SkillsProps {
  className?: string;
  skills: Skill[];
  selectedSkills?: Skill[];
  setSelectedSkills?: Dispatch<SetStateAction<Skill[]>>;
}

interface SkillsViewProps {
  items: ChipItem[];
  className?: string;
}

function SkillsView({ ...props }: SkillsViewProps) {
  return <ChipGroup type="upload" {...props} />;
}

export default function Skills({
  skills,
  selectedSkills,
  setSelectedSkills,
  ...props
}: SkillsProps) {
  return (
    <SkillsView
      items={skills.map((skill) => ({
        id: skill.skillId,
        label: skill.skillName,
        onClick: () =>
          setSelectedSkills?.((originSelectedSkills) => {
            if (
              originSelectedSkills.find(
                (selectedSkill) => selectedSkill.skillId === skill.skillId,
              )
            ) {
              return originSelectedSkills.filter(
                (v) => v.skillId !== skill.skillId,
              );
            }
            return [...originSelectedSkills, skill];
          }),
        selected: selectedSkills?.some(
          (selectedSkill) => selectedSkill.skillId === skill.skillId,
        ),
      }))}
      {...props}
    />
  );
}
