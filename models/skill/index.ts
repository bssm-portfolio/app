import httpClient from "@/apis";
import { Skill } from "@/types/skill.interface";
import { useQuery } from "@tanstack/react-query";
import KEY from "../key";

export const useSkill = (keyword: string) => {
  const { data } = useQuery<Skill[]>([KEY.SKILL], () =>
    httpClient.skill.get().then((d) => d.data.list),
  );
  return {
    data: (data || [])
      .filter((skill) => {
        if (keyword.length === 0) return false;
        return skill.skillName.toLowerCase().includes(keyword.toLowerCase());
      })
      .sort((a, b) => a.skillName.length - b.skillName.length)
      .slice(0, 5),
  };
};

export default { useSkill };
