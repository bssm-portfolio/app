import Image from "next/image";
import { getTimeAgo } from "@/utils/date";
import { useCommentList } from "@/models/portfolio";

export default function CommentList() {
  const { data } = useCommentList();
  return (
    <div>
      <div className="flex mt-base">
        <Image
          src={data[0].userProfile}
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
        />
      </div>
      <div className="mt-2xlarge">
        {data.map((comment) => {
          return (
            <div className="flex items-center mb-xlarge">
              <Image
                className="rounded-full mr-base"
                src={comment.userProfile}
                alt="프로필 사진"
                width={40}
                height={40}
              />
              <div>
                <div className="flex items-center">
                  <h2 className="font-bold text-small mr-xsmall">
                    {comment.userName}
                  </h2>
                  ·{" "}
                  <span className="text-primary-dark_gray text-xsmall">
                    {getTimeAgo(comment.createdDate)}
                  </span>
                </div>
                <p className="text-middle">{comment.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
