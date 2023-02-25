import httpClient from "@/apis";
import Button from "@/components/atoms/Button";
import CheckBox from "@/components/atoms/CheckBox";
import Input from "@/components/atoms/Input";
import Radio from "@/components/atoms/Radio";
import useOverlay from "@/hooks/useOverlay";
import { MemberType } from "@/types/member.interface";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select, { Option } from "../../Select";

export interface SignupForm {
  username: string;
  password: string;
  memberType: MemberType;
  schoolGrade: number;
  schoolClass: number;
  schoolNumber: number;
  phone: string;
  belong: string;
  admissionDate: string;
}

export default function SignupPopupView() {
  const { watch, register, handleSubmit, setValue, control } =
    useForm<SignupForm>({
      defaultValues: { memberType: MemberType.STUDENT },
    });
  const [isPrivacyAgree, setIsPrivacyAgree] = useState(false);
  const { openToast } = useOverlay();

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    if (!isPrivacyAgree) return openToast("개인정보 이용 동의가 필요합니다.");
    const isTeacher = data.memberType === MemberType.TEACHER;
    const payload = {
      ...data,
      schoolGrade: isTeacher ? undefined : data.schoolGrade,
      schoolClass: isTeacher ? undefined : data.schoolClass,
      schoolNumber: isTeacher ? undefined : data.schoolNumber,
      admissionDate: isTeacher ? undefined : data.admissionDate,
    };
    httpClient.memberSignup
      .post(payload)
      .then(() => {
        if (typeof window !== "undefined") window.location.href = "/";
      })
      .catch(() => openToast("잘못된 정보가 있습니다."));
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
          <Input placeholder="전화번호" registerReturn={register("phone")} />
          <Input placeholder="소속" registerReturn={register("belong")} />
          {memberType === MemberType.STUDENT && (
            <>
              <div className="flex justify-between gap-1">
                <Select
                  className="w-full"
                  placeholder="학년"
                  control={control}
                  setValue={(v: Option) =>
                    typeof v.value === "number" &&
                    setValue("schoolGrade", v.value)
                  }
                  options={Array(3)
                    .fill(null)
                    .map((_, i) => ({ label: String(i + 1), value: i + 1 }))}
                />
                <Select
                  className="w-full"
                  placeholder="반"
                  control={control}
                  setValue={(v: Option) =>
                    typeof v.value === "number" &&
                    setValue("schoolClass", v.value)
                  }
                  options={Array(4)
                    .fill(null)
                    .map((_, i) => ({ label: String(i + 1), value: i + 1 }))}
                />
                <Select
                  className="w-full"
                  placeholder="번호"
                  control={control}
                  setValue={(v: Option) =>
                    typeof v.value === "number" &&
                    setValue("schoolNumber", v.value)
                  }
                  options={Array(20)
                    .fill(null)
                    .map((_, i) => ({ label: String(i + 1), value: i + 1 }))}
                />
              </div>
              <Input
                placeholder="입학년도"
                registerReturn={register("admissionDate")}
              />
            </>
          )}
        </div>
        <div>
          <div className="flex justify-center gap-1">
            <p>
              <Link
                href="/docs/privacy"
                rel="noopener noreferrer"
                target="_blank"
                className="font-bold"
              >
                개인정보 수집
              </Link>
              에 동의합니다.{" "}
            </p>
            <CheckBox
              checked={isPrivacyAgree}
              onChange={(e) => setIsPrivacyAgree(e.target.checked)}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">완료</Button>
        </div>
      </form>
    </div>
  );
}
