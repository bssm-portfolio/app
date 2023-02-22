import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/models/portfolio";
import { Skill } from "@/types/skill.interface";
import { PortfolioForm, PortfolioType } from "@/types/portfolio.interface";
import httpClient from "@/apis";
import { getFormData } from "@/utils/file";
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
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [videoFile, setVideoFile] = useState<File>();
  const [videoFileUid, setVideoFileUid] = useState<string>("");
  const [thumbnailFileUid, setThumbnailFileUid] = useState<string>("");

  const { data: portfolio } = usePortfolio(portfolioId);

  const { register, handleSubmit, reset } = useForm<PortfolioForm>({
    defaultValues: portfolio,
  });

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
      videoFileUid: videoFile
        ? (
            await httpClient.file.upload(getFormData(videoFile))
          ).data.fileUid
        : videoFileUid,
      thumbnailFileUid: thumbnailFile
        ? (
            await httpClient.file.upload(getFormData(thumbnailFile))
          ).data.fileUid
        : thumbnailFileUid,
    });
  };

  useEffect(() => {
    setThumbnailFileUid(portfolio.thumbnail.fileUid);
    setVideoFileUid(portfolio.video.fileUid);
    setSelectedSkills([
      {
        skillId: 2501,
        skillName: "SAP",
      },
      {
        skillId: 2779,
        skillName: "ARM",
      },
      {
        skillId: 2818,
        skillName: "AVA",
      },
    ]);
    reset(portfolio);
  }, [portfolio, reset]);

  return (
    <form className="p-12">
      <Input registerReturn={register("title")} placeholder="title" />
      <Input
        registerReturn={register("description")}
        placeholder="description"
      />
      <Input
        registerReturn={register("portfolioUrl")}
        placeholder="portfolioUrl"
      />

      <EditFileUploadView
        register={register}
        thumbnailFileUid={thumbnailFileUid}
        setThumbnailFile={setThumbnailFile}
        setVideoFile={setVideoFile}
        videoFileUid={videoFileUid}
        thumbnail={portfolio.thumbnail}
      />

      <Input
        registerReturn={register("gitUrl")}
        placeholder="https://github.com/"
      />

      <SkillForm
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
      />

      <ScopeView register={register} scope={portfolio.scope} />

      <Button type="submit" onClick={handleSubmit(onValid)}>
        수정하기
      </Button>
    </form>
  );
}
