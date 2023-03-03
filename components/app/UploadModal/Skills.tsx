import Chip from "@/components/atoms/Chip";
import ChipGroup from "@/components/atoms/ChipGroup";
import { Skill } from "@/types/skill.interface";

interface SkillsProps {
  className?: string;
  skills: Skill[];
  selectedSkills: Skill[];
  setSelectedSkills: (skill: Skill) => void;
}

function SkillsView({
  className,
  skills,
  selectedSkills,
  setSelectedSkills,
}: SkillsProps) {
  return (
    <ChipGroup
      skillList={skills}
      selectedSkills={selectedSkills}
      setSelectedSkills={setSelectedSkills}
      type="upload"
      className={className}
    />
  );
}

export default function Skills(props: SkillsProps) {
  return <SkillsView {...props} />;
}
