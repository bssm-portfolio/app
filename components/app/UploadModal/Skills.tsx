import ChipGroup from "@/components/atoms/ChipGroup";
import { Skill } from "@/types/skill.interface";

interface SkillsProps {
  className?: string;
  skills: Skill[];
  selectedSkills: Skill[];
  setSelectedSkills: (skill: Skill) => void;
}

function SkillsView({ skills, ...props }: SkillsProps) {
  return <ChipGroup skillList={skills} type="upload" {...props} />;
}

export default function Skills(props: SkillsProps) {
  return <SkillsView {...props} />;
}
