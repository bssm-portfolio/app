import Input from "@/components/atoms/Input";
import LabelForm from "@/components/atoms/LabelForm";
import Textarea from "@/components/atoms/Textarea";
import React from "react";

export default function FormView() {
  return (
    <div className="w-full">
      <LabelForm label="제목" className="mb-6">
        <Input className="w-full" placeholder="제목" />
      </LabelForm>
      <LabelForm label="설명" className="mb-6">
        <Textarea className="w-full" placeholder="설명" />
      </LabelForm>
      <LabelForm label="기술스택(중복선택 가능)" className="mb-6">
        <Input className="w-full" placeholder="기술스택을 입력하세요" />
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
