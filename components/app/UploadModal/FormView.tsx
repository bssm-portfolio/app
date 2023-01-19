import Input from "@/components/atoms/Input";
import LabelForm from "@/components/atoms/LabelForm";
import Textarea from "@/components/atoms/Textarea";
import { PortfolioForm } from "@/types/portfolio.interface";
import classNames from "classnames";
import { UseFormRegister } from "react-hook-form";
import SearchIcon from "@/components/Icon/SearchIcon";

export default function FormView({
  register,
  className,
}: {
  register: UseFormRegister<PortfolioForm>;
  className?: string;
}) {
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
          registerReturn={register("title", { required: true })}
        />
      </LabelForm>
      <LabelForm label="설명" className="mb-6">
        <Textarea
          className="w-full"
          placeholder="설명"
          registerReturn={register("description", { required: true })}
        />
      </LabelForm>
      <LabelForm label="기술스택(중복선택 가능)" className="relative mb-6">
        <SearchIcon className="absolute top-9 left-3 w-[0.8125rem]" />
        <Input className="w-full pl-8" placeholder="기술스택을 입력하세요" />
      </LabelForm>
      <LabelForm label="참여자 아이디" className="mb-6">
        <Input className="w-full" placeholder="#해시태그" />
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
