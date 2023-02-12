import httpClient from "@/apis";
import { Comment } from "@/types/portfolio.interface";
import { getTimeAgo } from "@/utils/date";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "./Button";

export default function CommentView({ comment }: { comment: Comment }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);
  const router = useRouter();

  const handleDelete = async (commentId: number) => {
    try {
      await httpClient.comment.delete({ data: { commentId } });
      alert("삭제에 성공하였습니다");
    } catch (error) {
      alert("삭제에 실패하였습니다.");
      throw error;
    }
  };

  const handleEdit = async () => {
    setIsEdit((prev) => !prev);
  };

  const handleEditCompleted = async (commentId: number) => {
    try {
      await httpClient.comment.put({
        commentId,
        content: editContent,
      });
      alert("수정 성공");
      router.reload();
    } catch (error) {
      alert("수정 실패.");
      throw error;
    }
  };

  return (
    <div className="flex items-center mb-xlarge" key={comment.commentId}>
      <Image
        className="rounded-full mr-base"
        src={comment.writer.profileImageUrl}
        alt="프로필 사진"
        width={40}
        height={40}
      />
      <div className="w-full flex justify-between">
        <div className="w-full">
          <div className="flex items-center">
            <h2 className="font-bold text-small mr-xsmall">
              {comment.writer.name}
            </h2>
            <span>·</span>
            <span className="ml-1 text-primary-dark_gray text-xsmall">
              {getTimeAgo(comment.createdDate)}
            </span>
          </div>
          {isEdit ? (
            <>
              <input
                type="text"
                className="w-full border-b border-b-primary-border_gray"
                value={editContent}
                onChange={(event) => {
                  setEditContent(event.target.value);
                }}
              />
              <Button onClick={() => handleEditCompleted(comment.commentId)}>
                완료
              </Button>
              <Button onClick={handleEdit} varient="secondary">
                취소
              </Button>
            </>
          ) : (
            <p className="text-middle">{comment.content}</p>
          )}
        </div>
        {comment.editable ? (
          <div>
            <span onClick={handleEdit}>수정</span>
            <span onClick={() => handleDelete(comment.commentId)}>삭제</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
