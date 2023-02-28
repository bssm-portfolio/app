import httpClient from "@/apis";
import useOverlay from "@/hooks/useOverlay";
import KEY from "@/models/key";
import { Member } from "@/types/member.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

export default function ProfileEdit({ userInfo }: { userInfo: Member }) {
  const { register, handleSubmit, reset } = useForm<Member>();
  const { openToast } = useOverlay();
  const queryClient = useQueryClient();

  useEffect(() => {
    reset(userInfo);
  }, [reset, userInfo]);

  const onValid: SubmitHandler<Member> = (submitData) => {
    console.log(submitData);
    httpClient.member
      .put({ ...userInfo, ...submitData })
      .then(() => openToast("수정에 성공하였습니다."))
      .catch(() => {
        openToast("수정에 실패하였습니다.");
        queryClient.invalidateQueries([KEY.MEMBER]);
      });
  };

  const onInVaild: SubmitErrorHandler<Member> = (submitData) => {
    console.log(submitData);
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
      <Button type="submit">제출</Button>
    </form>
  );
}
