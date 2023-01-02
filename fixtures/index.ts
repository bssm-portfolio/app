import { Comment, Portfolio } from "@/types/portfolio.interface";

const avatarUrl =
  "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg";

const portfolioUrl = "/assets/images/testPortfolioThumbnail.png";

const comment: Comment = {
  commentId: 0,
  userProfile:
    "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
  userName: "사람 이름1",
  content: "댓글 내용입니다.",
  createdDate: new Date("2022-12-01"),
};

const portfolio: Portfolio = {
  portfolioId: 0,
  writer: {
    memberId: 0,
    name: "아이유",
    profileImageUrl: avatarUrl,
    email: "iu@koko.com",
  },
  portfolioType: "VIDEO",
  title: "포트폴리오 제목입니다.",
  description: "string",
  portfolioUrl,
  video: {
    fileName: "string",
    filePath: "string",
    fileUid: "string",
    fileSize: 0,
  },
  thumbnail: {
    fileName: "string",
    filePath: "string",
    fileUid: "string",
    fileSize: 0,
  },
  scope: "PUBLIC",
  gitUrl: "string",
  skillList: ["REACT", "JAVA", "Node.js", "Type"],
  contributorList: [
    {
      memberId: 0,
      name: "string",
      profileImageUrl: "string",
      email: "string",
    },
  ],
  bookmarks: 120,
  views: 0,
  comments: 12,
  createdDate: new Date("2022-12-01"),
};

const portfolioList = Array(10)
  .fill(0)
  .map((_, idx) => {
    return { ...portfolio, portfolioId: idx };
  });

const commentList = Array(10)
  .fill(null)
  .map((_, idx) => {
    return { ...comment, portfolioId: idx };
  });

const fixture = {
  avatarUrl,
  portfolioUrl,
  portfolio,
  portfolioList,
  commentList,
};

export default fixture;
