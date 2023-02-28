import Input from "@/components/atoms/Input";
import LabelForm from "@/components/atoms/LabelForm";
import Textarea from "@/components/atoms/Textarea";
import { PortfolioForm, PortfolioTheme } from "@/types/portfolio.interface";
import classNames from "classnames";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useSkill } from "@/models/skill";
import { Dispatch, SetStateAction, useState } from "react";
import { Skill } from "@/types/skill.interface";
import SkillForm from "@/components/common/SkillForm";
import UserSearchForm from "@/components/common/UserSearchForm";
import { Member } from "@/types/member.interface";
import Select, { Option } from "@/components/common/Select";
import config from "@/config";

interface FormProps {
  register: UseFormRegister<PortfolioForm>;
  className?: string;
  selectedMembers: Member[];
  setSelectedMembers: Dispatch<SetStateAction<Member[]>>;
  selectedSkills: Skill[];
  setSelectedSkills: Dispatch<SetStateAction<Skill[]>>;
  setValue: UseFormSetValue<PortfolioForm>;
}

function FormView({
  register,
  className,
  selectedMembers,
  setSelectedMembers,
  selectedSkills,
  setSelectedSkills,
  setValue,
}: FormProps) {
  const getFormViewCss = () => {
    return `w-full 
    h-[32.5rem] 
    overflow-auto 
    pr-6 
    pl-[0.0625rem] 
    scrollbar 
    scrollbar-w-[0.3125rem] 
    scrollbar-track-inherit 
    scrollbar-thumb-gray-300 
    scrollbar-thumb-rounded-md 
    hover:scrollbar-thumb-primary-scroll_gray
    `;
  };

  return (
    <div className={classNames(getFormViewCss(), className)}>
      <LabelForm label="제목" className="mb-6">
        <Input
          className="w-full"
          placeholder="제목"
          registerReturn={register("title", {
            required: "제목",
          })}
        />
      </LabelForm>
      <LabelForm label="설명" className="mb-6">
        <Textarea
          className="w-full"
          placeholder="설명"
          registerReturn={register("description", {
            required: "설명",
          })}
        />
      </LabelForm>
      <LabelForm label="테마" className="mb-6">
        <Select
          placeholder=""
          options={config.portfolioThemeOptions}
          setValue={(option: Option) =>
            setValue("portfolioTheme", option.value as PortfolioTheme)
          }
        />
      </LabelForm>
      <LabelForm label="기술스택(중복선택 가능)" className="mb-6">
        <SkillForm
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
        />
      </LabelForm>
      <LabelForm label="참여자 아이디" className="mb-6">
        <UserSearchForm
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
        />
      </LabelForm>
      <LabelForm label="Github 주소" className="mb-6">
        <Input
          className="w-full"
          placeholder="https://github.com/"
          registerReturn={register("gitUrl")}
        />
      </LabelForm>
    </div>
  );
}

export default function Form(props: FormProps) {
  const [skillSearchText, setSkillSearchText] = useState("");
  const { data: skills } = useSkill(skillSearchText);

  return <FormView {...props} {...{ setSkillSearchText, skills }} />;
}
