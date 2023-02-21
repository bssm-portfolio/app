import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/models/portfolio";
import { Skill } from "@/types/skill.interface";
import { PortfolioForm, PortfolioType } from "@/types/portfolio.interface";
import httpClient from "@/apis";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import SkillForm from "../../common/SkillForm";
import EditFileUploadView from "./EditFileUploadView";
import ScopeView from "./ScopeView";

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
    <form className="p-12">
      <Input
        registerReturn={register("title", { required: true })}
        defaultValue={portfolio.title}
        placeholder="title"
      />
      <Input
        registerReturn={register("description", { required: true })}
        defaultValue={portfolio.description}
        placeholder="description"
      />
      <Input
        registerReturn={register("portfolioUrl")}
        defaultValue={portfolio.portfolioUrl}
        placeholder="portfolioUrl"
      />

      <EditFileUploadView
        register={register}
        thumbnailFileUid={thumbnailFileUid}
        setThumbnailFileUid={setThumbnailFileUid}
        videoFileUid={videoFileUid}
        setVideoFileUid={setVideoFileUid}
      />

      <Input
        registerReturn={register("gitUrl")}
        defaultValue={portfolio.gitUrl}
        placeholder="https://github.com/"
      />

      <SkillForm
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
      />

      <ScopeView register={register} />

      <Button type="submit" onClick={handleSubmit(onValid)}>
        수정하기
      </Button>
    </form>
  );
}
