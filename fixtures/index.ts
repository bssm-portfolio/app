import config from "@/config";
import { emptyUser } from "@/store";
import { Member, MemberType } from "@/types/member.interface";
import { Comment, Portfolio } from "@/types/portfolio.interface";

const avatarUrl = config.defaultProfile;

const portfolioUrl = config.defaultProfile;

const comment: Comment = {
  writer: {
    memberId: 0,
    name: "string",
    profileImageUrl: config.defaultProfile,
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
    name: "",
    profileImageUrl: avatarUrl,
    email: "",
    memberType: MemberType.STUDENT,
  },
  bookmarkYn: false,
  followYn: false,
  portfolioType: "VIDEO",
  portfolioUrl: "",
  title: "",
  description: "",
  video: {
    fileName: "",
    filePath: "",
    fileUid: "",
    fileSize: 0,
  },
  thumbnail: {
    fileName: "",
    filePath: "",
    fileUid: "",
    fileSize: 0,
  },
  scope: "PUBLIC",
  gitUrl: "",
  skillList: [],
  contributorList: [emptyUser],
  bookmarks: 0,
  views: 0,
  comments: 0,
  createdDate: new Date(),
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

const user: Member = {
  memberId: 0,
  name: "",
  profileImageUrl: "",
  email: "",
  description: "",
  phone: "",
  job: "",
  memberType: MemberType.STUDENT,
  memberRoleType: "ROLE_NORMAL",
  portfolioCount: 0,
  followerCount: 0,
  followingCount: 0,
  followYn: false,
  schoolGrade: 0,
  schoolClass: 0,
  schoolNumber: 0,
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
