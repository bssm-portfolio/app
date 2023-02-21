import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { usePortfolio } from "@/models/portfolio";
import { Skill } from "@/types/skill.interface";
import { useSkill } from "@/models/skill";
import { PortfolioForm, PortfolioType } from "@/types/portfolio.interface";
import httpClient from "@/apis";
import { handleFileUpload } from "@/utils/file";
import { SearchIcon } from "../Icon";
import Input from "../atoms/Input";
import Skills from "../app/UploadModal/Skills";
import Radio from "../atoms/Radio";
import FileUploader from "../atoms/FileUploader";

export default function PortfolioEdit({
  portfolioId,
}: {
  portfolioId: number;
}) {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [skillSearchText, setSkillSearchText] = useState("");
  const [videoFileUid, setVideoFileUid] = useState("");
  const [thumbnailFileUid, setThumbnailFileUid] = useState("");

  const { register, handleSubmit } = useForm<PortfolioForm>();
  const { data: skills } = useSkill(skillSearchText);
  const { data: portfolio } = usePortfolio(portfolioId);

  const onValid: SubmitHandler<PortfolioForm> = async (data) => {
    const getPortfolioType = (): PortfolioType => {
      if (data.portfolioUrl.length > 0 && videoFileUid) {
        return "ALL";
      }
      if (videoFileUid) {
        return "VIDEO";
      }
      return "URL";
    };

    await httpClient.portfolio.put({
      ...data,
      portfolioType: getPortfolioType(),
      skillList: selectedSkills,
      contributorIdList: [],
      videoFileUid,
      thumbnailFileUid,
    });
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Input
        registerReturn={register("title", { required: true })}
        value={portfolio.title}
      />
      <Input
        registerReturn={register("description", { required: true })}
        value={portfolio.description}
      />
      <Input
        registerReturn={register("videoFileUid", { required: true })}
        value={portfolio.video.fileName}
      />
      <div className="w-full border h-60 mb-2.5 flex flex-col justify-center items-center border-primary-border_gray gap-2.5 rounded-lg">
        <FileUploader
          id="thumbnail-uploader"
          label="썸네일 업로드"
          onChange={(event) => handleFileUpload(event, setThumbnailFileUid)}
        />
        <FileUploader
          id="video-uploader"
          label="동영상 업로드"
          onChange={(event) => handleFileUpload(event, setVideoFileUid)}
        />
        <p>동영상 파일을 드래그 앤 드롭하여 업로드</p>
      </div>
      <Input
        registerReturn={register("gitUrl", { required: true })}
        value={portfolio.gitUrl}
        placeholder="https://github.com/"
      />
      <Skills
        skills={selectedSkills}
        selectedSkills={selectedSkills}
        setSelectedSkills={(skill) =>
          setSelectedSkills((s) =>
            s.filter(
              (selectedSkill) => selectedSkill.skillId !== skill.skillId,
            ),
          )
        }
      />
      <div className="relative">
        <SearchIcon className="absolute top-2 left-3 w-[0.8125rem]" />
        <Input
          className="w-full pl-8 mb-2"
          placeholder="기술스택을 입력하세요"
          onChange={(e) => setSkillSearchText(e.target.value)}
        />
      </div>
      <Skills
        skills={skills}
        selectedSkills={selectedSkills}
        setSelectedSkills={(v) =>
          setSelectedSkills((s) => {
            if (s.includes(v)) {
              return s.filter((sv) => sv !== v);
            }
            return [...s, v];
          })
        }
      />

      <h2 className="text-base mb-large">공개범위</h2>
      <Radio
        registerReturn={register("portfolioScope", { required: true })}
        id="entire"
        label="전체"
        value="PUBLIC"
        description="누구나 볼 수 있습니다."
      />
      <Radio
        registerReturn={register("portfolioScope", { required: true })}
        id="part"
        label="일부"
        value="PROTECTED"
        description="링크가 있으면 누구든 볼 수 있습니다."
      />
      <Radio
        registerReturn={register("portfolioScope", { required: true })}
        id="private"
        label="비공개"
        value="PRIVATE"
        description="나와 내가 선택한 사람만 볼 수 있습니다."
      />
    </form>
  );
}
