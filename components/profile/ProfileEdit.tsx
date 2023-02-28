import httpClient from "@/apis";
import useOverlay from "@/hooks/useOverlay";
import KEY from "@/models/key";
import { Member, MemberType } from "@/types/member.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
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
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onValid, onInValid)}
    >
      <Input registerReturn={register("name")} placeholder="이름" />
      <Input registerReturn={register("description")} placeholder="소개" />
      <Input registerReturn={register("email")} placeholder="이메일" />
      <Input registerReturn={register("job")} placeholder="분야" />
      <Input registerReturn={register("phone")} placeholder="전화번호" />
      {isStudent && (
        <div className="flex justify-between gap-1">
          <Select
            className="w-full"
            placeholder="학년"
            setValue={(v: Option) =>
              typeof v.value === "number" && setValue("schoolGrade", v.value)
            }
            options={Array(3)
              .fill(null)
              .map((_, i) => ({ label: String(i + 1), value: i + 1 }))}
            defaultValue={userInfo.schoolGrade.toString()}
          />
          <Select
            className="w-full"
            placeholder="반"
            setValue={(v: Option) =>
              typeof v.value === "number" && setValue("schoolClass", v.value)
            }
            options={Array(4)
              .fill(null)
              .map((_, i) => ({ label: String(i + 1), value: i + 1 }))}
            defaultValue={userInfo.schoolClass.toString()}
          />
          <Select
            className="w-full"
            placeholder="번호"
            setValue={(v: Option) =>
              typeof v.value === "number" && setValue("schoolNumber", v.value)
            }
            options={Array(20)
              .fill(null)
              .map((_, i) => ({ label: String(i + 1), value: i + 1 }))}
            defaultValue={userInfo.schoolNumber.toString()}
          />
        </div>
      )}
      <Button type="submit">제출</Button>
    </form>
  );
}
