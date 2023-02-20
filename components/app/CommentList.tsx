import Image from "next/image";
import { useCommentList } from "@/models/portfolio";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRef, useState } from "react";
import httpClient from "@/apis";
import useUser from "@/hooks/useUser";
import Comment from "../atoms/Comment";
import InputButton from "../atoms/InputButton";

interface CommentForm {
  content: string;
}

export default function CommentList({ portfolioId }: { portfolioId?: number }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const { list: commentList, refetch } = useCommentList(portfolioId);
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const [isWriting, setIsWriting] = useState(false);

  const onValid: SubmitHandler<CommentForm> = async (submitData) => {
    await httpClient.comment.post({
      portfolioId,
      ...submitData,
    });
    reset();
    refetch();
  };

  const checkInputValueIsNull = () => {
    if (inputRef.current) return inputRef.current.value !== "";
    return false;
  };

  return (
    <div>
      <form className="flex mt-base relative" onSubmit={handleSubmit(onValid)}>
        <Image
          src={user.profileImageUrl}
          alt="프로필"
          width={40}
          height={40}
          sizes="100px"
          className="rounded-full"
        />
        <input
          type="text"
          className="w-full ml-base border-b-[0.0625rem] border-b-border-gray outline-none"
          placeholder="댓글 추가.."
          {...register("content", { required: true })}
          ref={inputRef}
          onChange={() => setIsWriting(checkInputValueIsNull())}
        />
        {isWriting && (
          <InputButton
            type="submit"
            className="absolute top-0 right-1"
            onClick={handleSubmit(onValid)}
          >
            입력
          </InputButton>
        )}
      </form>
      <div className="mt-2xlarge">
        {commentList.map((comment) => {
          return (
            <Comment
              comment={comment}
              refetch={refetch}
              key={comment.commentId}
            />
          );
        })}
      </div>
    </div>
  );
}
