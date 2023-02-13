import Image from "next/image";
import { useCommentList } from "@/models/portfolio";
import { SubmitHandler, useForm } from "react-hook-form";
import httpClient from "@/apis";
import { useUser } from "@/hooks/useUser";
import Comment from "../atoms/Comment";

interface CommentForm {
  content: string;
}

export default function CommentList({ portfolioId }: { portfolioId?: number }) {
  const { user } = useUser();
  const { list: commentList, refetch } = useCommentList(portfolioId);
  const { register, handleSubmit } = useForm<CommentForm>();

  const onValid: SubmitHandler<CommentForm> = async (submitData) => {
    await httpClient.comment.post({
      portfolioId,
      ...submitData,
    });
    refetch();
  };

  return (
    <div>
      <form className="flex mt-base" onSubmit={handleSubmit(onValid)}>
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
          {...register("content")}
        />
      </form>
      <div className="mt-2xlarge">
        {commentList.map((comment) => {
          return <Comment comment={comment} refetch={refetch} />;
        })}
      </div>
    </div>
  );
}
