import Input from "@/components/atoms/Input";
import LabelForm from "@/components/atoms/LabelForm";
import Textarea from "@/components/atoms/Textarea";
import SearchIcon from "@/components/Icon/SearchIcon";

export default function FormView() {
  return (
    <div className="w-full h-[32.5rem] overflow-auto px-6">
      <LabelForm label="제목" className="mb-6">
        <Input className="w-full" placeholder="제목" />
      </LabelForm>
      <LabelForm label="설명" className="mb-6">
        <Textarea className="w-full" placeholder="설명" />
      </LabelForm>
      <LabelForm label="기술스택(중복선택 가능)" className="relative mb-6">
        <SearchIcon className="absolute top-9 left-3 w-[0.8125rem]" />
        <Input className="w-full pl-8" placeholder="기술스택을 입력하세요" />
      </LabelForm>
      <LabelForm label="참여자 아이디" className="mb-6">
        <Input className="w-full" placeholder="#해시태그" />
      </LabelForm>
      <LabelForm label="Github 주소" className="mb-6">
        <Input className="w-full" placeholder="https://github.com/" />
      </LabelForm>
    </div>
  );
}
