import httpClient from "@/apis";
import useOverlay from "@/hooks/useOverlay";
import KEY from "@/models/key";
import { Member, MemberType } from "@/types/member.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import LabelForm from "../atoms/LabelForm";
import Textarea from "../atoms/Textarea";
import Select, { Option } from "../common/Select";

export default function ProfileEdit({ userInfo }: { userInfo: Member }) {
  const { register, handleSubmit, reset, setValue } = useForm<Member>({
    defaultValues: userInfo,
  });
  const { openToast } = useOverlay();
  const queryClient = useQueryClient();
  const isStudent = userInfo.memberType === MemberType.STUDENT;

  useEffect(() => {
    reset(userInfo);
  }, [reset, userInfo]);

  const onValid: SubmitHandler<Member> = (validData) => {
    const payload = {
      ...userInfo,
      ...validData,
      schoolGrade: isStudent ? validData.schoolGrade : undefined,
      schoolClass: isStudent ? validData.schoolClass : undefined,
      schoolNumber: isStudent ? validData.schoolNumber : undefined,
    };
    httpClient.member
      .put(payload)
      .then(() => openToast("수정에 성공하였습니다."))
      .catch(() => {
        openToast("수정에 실패하였습니다.", { type: "danger" });
        queryClient.invalidateQueries([KEY.MEMBER]);
      });
  };

  const onInValid: SubmitErrorHandler<Member> = () =>
    openToast("잘못된 정보입니다.", { type: "danger" });

  return (
    <form
      className="flex justify-center gap-4"
      onSubmit={handleSubmit(onValid, onInValid)}
    >
      <div className="min-w-[25rem] max-w-[30rem]">
        <h1 className="w-full mb-8 font-bold text-xl">프로필 수정</h1>
        <LabelForm label="이름" className="mb-4">
          <Input
            className="w-full"
            registerReturn={register("name")}
            placeholder="이름"
          />
        </LabelForm>
        <LabelForm label="소개" className="mb-4">
          <Textarea
            className="w-full h-60"
            registerReturn={register("description")}
            placeholder="소개"
          />
        </LabelForm>
        <LabelForm label="소개" className="mb-4">
          <Input
            className="w-full"
            disabled
            registerReturn={register("email")}
            placeholder="이메일"
          />
        </LabelForm>
        <LabelForm label="분야" className="mb-4">
          <Input
            className="w-full"
            registerReturn={register("job")}
            placeholder="분야"
          />
        </LabelForm>
        <LabelForm label="전화번호" className="mb-4">
          <Input
            className="w-full"
            registerReturn={register("phone")}
            placeholder="전화번호"
          />
        </LabelForm>
        {isStudent && (
          <LabelForm label="학년/반/번호" className="mb-4">
            <div className="flex justify-between gap-1">
              <Select
                className="w-full"
                placeholder="학년"
                setValue={(v: Option) =>
                  typeof v.value === "number" &&
                  setValue("schoolGrade", v.value)
                }
                options={Array(3)
                  .fill(null)
                  .map((_, i) => ({ label: String(i + 1), value: i + 1 }))}
                defaultValue={
                  userInfo.schoolGrade
                    ? userInfo.schoolGrade.toString()
                    : undefined
                }
              />
              <Select
                className="w-full"
                placeholder="반"
                setValue={(v: Option) =>
                  typeof v.value === "number" &&
                  setValue("schoolClass", v.value)
                }
                options={Array(4)
                  .fill(null)
                  .map((_, i) => ({ label: String(i + 1), value: i + 1 }))}
                defaultValue={
                  userInfo.schoolClass
                    ? userInfo.schoolClass.toString()
                    : undefined
                }
              />
              <Select
                className="w-full"
                placeholder="번호"
                setValue={(v: Option) =>
                  typeof v.value === "number" &&
                  setValue("schoolNumber", v.value)
                }
                options={Array(20)
                  .fill(null)
                  .map((_, i) => ({ label: String(i + 1), value: i + 1 }))}
                defaultValue={
                  userInfo.schoolNumber
                    ? userInfo.schoolNumber.toString()
                    : undefined
                }
              />
            </div>
          </LabelForm>
        )}
        <Button type="submit" className="w-full">
          제출
        </Button>
      </div>
    </form>
  );
}
