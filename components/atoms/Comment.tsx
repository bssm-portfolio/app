import httpClient from "@/apis";
import { Comment } from "@/types/portfolio.interface";
import { getTimeAgo } from "@/utils/date";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import Button from "./Button";

interface CommentViewProps {
  comment: Comment;
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult>;
}

export default function CommentView({ comment, refetch }: CommentViewProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);

  const handleDelete = async (commentId: number) => {
    await httpClient.comment.delete({ data: { commentId } });
    refetch();
  };

  const handleEdit = async () => {
    setIsEdit((prev) => !prev);
  };

  const handleEditCompleted = async (commentId: number) => {
    await httpClient.comment.put({
      commentId,
      content: editContent,
    });
    setIsEdit(false);
    refetch();
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
        {comment.editable && (
          <div>
            <span onClick={handleEdit}>수정</span>
            <span onClick={() => handleDelete(comment.commentId)}>삭제</span>
          </div>
        )}
      </div>
    </div>
  );
}
