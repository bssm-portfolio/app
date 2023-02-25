import Button from "@/components/atoms/Button";
import CheckBox from "@/components/atoms/CheckBox";
import Input from "@/components/atoms/Input";
import Radio from "@/components/atoms/Radio";
import useOverlay from "@/hooks/useOverlay";
import { MemberType } from "@/types/member.interface";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "../../Select";

interface SignupForm {
  username: string;
  password: string;
  memberType: MemberType;
}

export default function SignupPopupView() {
  const { watch, register, handleSubmit } = useForm<SignupForm>({
    defaultValues: { memberType: MemberType.STUDENT },
  });
  const [isPrivacyAgree, setIsPrivacyAgree] = useState(false);
  const { openToast } = useOverlay();

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    if (!isPrivacyAgree) return openToast("개인정보 이용 동의가 필요합니다.");
    return data;
  };

  const memberType = watch("memberType");
  return (
    <div className="pt-[1.6rem] pb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center gap-8 mb-8">
          <Radio
            id={MemberType.STUDENT}
            value={MemberType.STUDENT}
            label="학생"
            registerReturn={register("memberType")}
          />
          <Radio
            id={MemberType.TEACHER}
            value={MemberType.TEACHER}
            label="선생님"
            registerReturn={register("memberType")}
          />
        </div>
        <div className="flex flex-col gap-1 mb-6">
          <Input placeholder="전화번호" />
          <Input placeholder="소속" />
          {memberType === MemberType.STUDENT && (
            <>
              <div className="flex">
                <Select
                  placeholder="학년"
                  options={Array(3)
                    .fill(null)
                    .map((_, i) => ({ label: String(i + 1), value: i + 1 }))}
                />

                <Select
                  placeholder="반"
                  options={Array(4)
                    .fill(null)
                    .map((_, i) => ({ label: String(i + 1), value: i + 1 }))}
                />
                <Select
                  placeholder="번호"
                  options={Array(20)
                    .fill(null)
                    .map((_, i) => ({ label: String(i + 1), value: i + 1 }))}
                />
              </div>
              <Input placeholder="입학년도" />
            </>
          )}
        </div>
        <div>
          <p>
            <Link
              href="/docs/privacy"
              rel="noopener noreferrer"
              target="_blank"
            >
              개인정보 수집
            </Link>
            에 동의합니다.{" "}
            <CheckBox
              checked={isPrivacyAgree}
              onChange={(e) => setIsPrivacyAgree(e.target.checked)}
            />
          </p>
        </div>
        <div className="flex justify-end">
          <Button type="submit">완료</Button>
        </div>
      </form>
    </div>
  );
}
