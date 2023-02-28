import httpClient from "@/apis";
import useOverlay from "@/hooks/useOverlay";
import KEY from "@/models/key";
import { Member } from "@/types/member.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Select, { Option } from "../common/Select";

export default function ProfileEdit({ userInfo }: { userInfo: Member }) {
  const { register, handleSubmit, reset, setValue } = useForm<Member>();
  const { openToast } = useOverlay();
  const queryClient = useQueryClient();

  useEffect(() => {
    reset(userInfo);
  }, [reset, userInfo]);

  const onValid: SubmitHandler<Member> = (validData) => {
    httpClient.member
      .put({ ...userInfo, ...validData })
      .then(() => openToast("수정에 성공하였습니다."))
      .catch(() => {
        openToast("수정에 실패하였습니다.");
        queryClient.invalidateQueries([KEY.MEMBER]);
      });
  };

  const onInVaild: SubmitErrorHandler<Member> = (inValidData) => {
    console.log(inValidData);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onValid, onInVaild)}
    >
      <Input registerReturn={register("name")} />
      <Input registerReturn={register("description")} />
      <Input registerReturn={register("email")} />
      <Input registerReturn={register("job")} />
      <Input registerReturn={register("phone")} />
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
        />
        <Input registerReturn={register("admissionYear")} />
      </div>
      <Button type="submit">제출</Button>
    </form>
  );
}
