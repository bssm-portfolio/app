import httpClient from "@/apis";
import { RefetchType } from "@/types/index.interface";
import { Comment } from "@/types/portfolio.interface";
import { getTimeAgo } from "@/utils/date";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Kebab from "../common/KebabMenu";
import EditIcon from "../Icon/EditIcon";
import TrashCanIcon from "../Icon/TrashCanIcon";
import Button from "./Button";

interface CommentViewProps {
  comment: Comment;
  refetch: RefetchType;
}

export default function CommentView({ comment, refetch }: CommentViewProps) {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);

  const handleDelete = async (commentId: number) => {
    await httpClient.comment.delete({ data: { commentId } });
    refetch();
  };

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const moveToProfile = () =>
    router.push(`/profile/${comment.writer.memberId}`);

  const handleEditCompleted = async (commentId: number) => {
    await httpClient.comment.put({
      commentId,
      content: editContent,
    });
    setIsEdit(false);
    refetch();
  };

  return (
    <div className="flex items-center mb-xlarge">
      <div
        className="relative w-10 h-10 mr-base cursor-pointer"
        onClick={moveToProfile}
      >
        <Image
          className="rounded-full"
          src={comment.writer.profileImageUrl}
          alt="프로필 사진"
          fill
        />
      </div>

      <div className="w-full flex justify-between">
        <div className="w-full">
          <div className="flex items-center">
            <span
              className="font-bold text-small mr-xsmall cursor-pointer"
              onClick={moveToProfile}
            >
              {comment.writer.name}
            </span>
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
          <Kebab.KebabMenuProvider>
            <Kebab.KebabMenu>
              <Kebab.KebabItem className="pb-[0.3125rem]">
                <EditIcon className="w-3 h-3 mr-3" />
                <span onClick={handleEdit}>수정</span>
              </Kebab.KebabItem>
              <Kebab.KebabItem className="pt-[0.3125rem]">
                <TrashCanIcon className="w-3 h-3 mr-3" />
                <span onClick={() => handleDelete(comment.commentId)}>
                  삭제
                </span>
              </Kebab.KebabItem>
            </Kebab.KebabMenu>
          </Kebab.KebabMenuProvider>
        )}
      </div>
    </div>
  );
}
