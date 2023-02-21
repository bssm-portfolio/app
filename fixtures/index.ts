import { Comment, Portfolio } from "@/types/portfolio.interface";

const avatarUrl =
  "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg";

const portfolioUrl = "/assets/images/testPortfolioThumbnail.png";

const comment: Comment = {
  writer: {
    memberId: 0,
    name: "string",
    profileImageUrl:
      "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
    email: " string@gmail.com",
  },
  commentId: 0,
  content: "댓글 내용입니다.",
  createdDate: new Date("2022-12-01"),
  editable: false,
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
  portfolioUrl: "https://naver.com",
  title: "포트폴리오 제목입니다.",
  description: "string",
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
    {
      memberId: 1,
      name: "string1",
      profileImageUrl: "string1",
      email: "string1",
    },
    {
      memberId: 2,
      name: "string2",
      profileImageUrl: "string2",
      email: "string2",
    },
  ],
  bookmarks: 120,
  views: 0,
  comments: 12,
  createdDate: new Date("2022-12-01"),
};

const profileDescription = {
  avatarUrl,
  projectCount: 5,
  followerCount: 6,
  followingCount: 7,
  username: "소마고",
  role: "웹 / 앱 개발자",
  description: `안녕하세요
  코드코리아에서 앱과 웹 개발을 맡고있는 소마고입니다.
  
  디자이너 분들과 협업하고 싶습니다.
  디자이너 분들과 협업하고 싶습니다.
  디자이너 분들과 협업하고 싶습니다.
  디자이너 분들과 협업하고 싶습니다.
  디자이너 분들과 협업하고 싶습니다.
  디자이너 분들과 협업하고 싶습니다.
  디자이너 분들과 협업하고 싶습니다.
  
  somago@naver.com`,
};

const portfolioList = Array(10)
  .fill(null)
  .map((_, idx) => {
    return { ...portfolio, portfolioId: idx };
  });

const commentList = Array(10)
  .fill(null)
  .map((_, idx) => {
    return { ...comment, portfolioId: idx };
  });

const user = {
  memberId: "",
  name: "",
  profileImageUrl: "",
  email: "",
  description: "",
  phone: "",
  job: "",
  memberRoleType: "ROLE_NORMAL",
};

const defaultPagination = {
  page: 1,
  size: 0,
  totalCount: 0,
  totalPages: 1,
};

const fixture = {
  avatarUrl,
  portfolioUrl,
  portfolio,
  portfolioList,
  commentList,
  profileDescription,
  user,
  defaultPagination,
};

export default fixture;
