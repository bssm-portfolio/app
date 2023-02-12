import httpClient from "@/apis";
import { Comment as CommentProps } from "@/types/portfolio.interface";
import { getTimeAgo } from "@/utils/date";
import Image from "next/image";
import { useState } from "react";
import Button from "./Button";

export default function Comment({ comment }: { comment: CommentProps }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

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
    setIsEdit(true);
  };

  const handleEditCompleted = async (commentId: number) => {
    await httpClient.comment.put({
      commentId,
      content: editContent,
    });
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
            ·{" "}
            <span className="text-primary-dark_gray text-xsmall">
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
              <Button
                type="button"
                onClick={() => handleEditCompleted(comment.commentId)}
              >
                완료
              </Button>
              <Button varient="secondary" type="button">
                취소
              </Button>
            </>
          ) : (
            <p className="text-middle">{comment.content}</p>
          )}
        </div>
        {comment.editable ? (
          <div>
            <span onClick={handleEdit}>수정</span>/
            <span onClick={() => handleDelete(comment.commentId)}>삭제</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
