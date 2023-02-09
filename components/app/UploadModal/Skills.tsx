import Chip from "@/components/atoms/Chip";
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
    <Chip.Group type="upload" className={className}>
      {skills.map((skill) => (
        <Chip.Item
          key={skill.skillId}
          type="upload"
          selected={selectedSkills.some(
            (selectedSkill) => selectedSkill.skillId === skill.skillId,
          )}
          onClick={() => setSelectedSkills(skill)}
        >
          {skill.skillName}
        </Chip.Item>
      ))}
    </Chip.Group>
  );
}

export default function Skills(props: SkillsProps) {
  return <SkillsView {...props} />;
}
