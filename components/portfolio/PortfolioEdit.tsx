import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/models/portfolio";
import { Skill } from "@/types/skill.interface";
import { PortfolioForm, PortfolioType } from "@/types/portfolio.interface";
import httpClient from "@/apis";
import { handleFileUpload } from "@/utils/file";
import Input from "../atoms/Input";
import Radio from "../atoms/Radio";
import FileUploader from "../atoms/FileUploader";
import Button from "../atoms/Button";
import SkillForm from "../common/SkillForm";

interface PortfolioEditProps {
  portfolioId: number;
}

export default function PortfolioEdit({ portfolioId }: PortfolioEditProps) {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [thumbnailFileUid, setThumbnailFileUid] = useState("");
  const [videoFileUid, setVideoFileUid] = useState("");

  const { register, handleSubmit } = useForm<PortfolioForm>();
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
      portfolioId,
      portfolioType: getPortfolioType(),
      skillList: selectedSkills,
      contributorIdList: [0],
      videoFileUid,
      thumbnailFileUid,
    });
  };

  useEffect(() => {
    setThumbnailFileUid(portfolio.thumbnail.fileUid);
    setVideoFileUid(portfolio.video.fileUid);
  }, [portfolio]);

  return (
    <form>
      <Input
        registerReturn={register("title", { required: true })}
        defaultValue={portfolio.title}
      />
      <Input
        registerReturn={register("description", { required: true })}
        defaultValue={portfolio.description}
      />
      <Input
        registerReturn={register("portfolioUrl")}
        defaultValue={portfolio.description}
      />

      <div className="w-full border h-60 mb-2.5 flex flex-col justify-center items-center border-primary-border_gray gap-2.5 rounded-lg">
        <FileUploader
          id="edit-thumbnail-uploader"
          label="썸네일 업로드"
          onChange={(event) => handleFileUpload(event, setThumbnailFileUid)}
        />
        <FileUploader
          id="edit-video-uploader"
          label="동영상 업로드"
          onChange={(event) => handleFileUpload(event, setVideoFileUid)}
        />
        <Input
          registerReturn={register("thumbnailFileUid")}
          value={thumbnailFileUid}
          type="hidden"
        />
        <Input
          registerReturn={register("videoFileUid")}
          value={videoFileUid}
          type="hidden"
        />
        <p>동영상 파일을 드래그 앤 드롭하여 업로드</p>
      </div>

      <Input
        registerReturn={register("gitUrl")}
        defaultValue={portfolio.gitUrl}
        placeholder="https://github.com/"
      />

      <SkillForm
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
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
      <Button type="submit" onClick={handleSubmit(onValid)}>
        수정하기
      </Button>
    </form>
  );
}
