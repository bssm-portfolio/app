import { useSkill } from "@/models/skill";
import { Skill } from "@/types/skill.interface";
import { Dispatch, SetStateAction, useState } from "react";
import Skills from "../app/UploadModal/Skills";
import Input from "../atoms/Input";
import { SearchIcon } from "../Icon";

export default function SkillForm({
  selectedSkills,
  setSelectedSkills,
}: {
  selectedSkills: Skill[];
  setSelectedSkills: Dispatch<SetStateAction<Skill[]>>;
}) {
  const [skillSearchText, setSkillSearchText] = useState("");
  const { data: skills } = useSkill(skillSearchText);
  return (
    <>
      <Skills
        skills={selectedSkills}
        selectedSkills={selectedSkills}
        setSelectedSkills={(skill) =>
          setSelectedSkills((s) =>
            s.filter(
              (selectedSkill) => selectedSkill.skillId !== skill.skillId,
            ),
          )
        }
      />
      <div className="relative">
        <SearchIcon className="absolute top-2 left-3 w-[0.8125rem]" />
        <Input
          className="w-full pl-8 mb-2"
          placeholder="기술스택을 입력하세요"
          onChange={(e) => setSkillSearchText(e.target.value)}
        />
      </div>
      <Skills
        skills={skills}
        selectedSkills={selectedSkills}
        setSelectedSkills={(v) =>
          setSelectedSkills((s) => {
            if (s.includes(v)) {
              return s.filter((sv) => sv !== v);
            }
            return [...s, v];
          })
        }
      />
    </>
  );
}
