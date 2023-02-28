import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/models/portfolio";
import { Skill } from "@/types/skill.interface";
import { PortfolioForm, PortfolioType } from "@/types/portfolio.interface";
import httpClient from "@/apis";
import { getFileDownloadUrl, getFileUidByFileUpload } from "@/utils/file";
import Textarea from "@/components/atoms/Textarea";
import useOverlay from "@/hooks/useOverlay";
import { Member } from "@/types/member.interface";
import UserSearchForm from "@/components/common/UserSearchForm";
import LabelForm from "@/components/atoms/LabelForm";
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
  const [editThumbnailFile, setEditThumbnailFile] = useState<File>();
  const [editVideoFile, setEditVideoFile] = useState<File>();
  const [thumbnailFileUid, setThumbnailFileUid] = useState<string>("");
  const [videoFileUid, setVideoFileUid] = useState<string>("");
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  const { openToast } = useOverlay();
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

    const getVideoFileUid = () => {
      if (editVideoFile)
        return getFileUidByFileUpload(editVideoFile, openToast);
      if (videoFileUid && !editVideoFile) return videoFileUid;
      return undefined;
    };

    const getThumbnailFileUid = () => {
      if (editThumbnailFile)
        return getFileUidByFileUpload(editThumbnailFile, openToast);
      return thumbnailFileUid;
    };

    await httpClient.portfolio
      .put({
        ...data,
        portfolioId,
        portfolioType: getPortfolioType(),
        skillList: selectedSkills,
        contributorIdList: selectedMembers.map((member) => member.memberId),
        videoFileUid: await getVideoFileUid(),
        thumbnailFileUid: await getThumbnailFileUid(),
      })
      .then(() => openToast("수정이 완료되었습니다."))
      .catch((error) =>
        openToast(error.response.data.message, { type: "danger" }),
      );
  };

  useEffect(() => {
    setThumbnailFileUid(portfolio.thumbnail.fileUid);
    setVideoFileUid(portfolio.video?.fileUid);
    setSelectedSkills(portfolio.skillList);
    setSelectedMembers(portfolio.contributorList);
    reset(portfolio);
  }, [portfolio, reset]);

  return (
    <form className="p-12">
      <Input registerReturn={register("title")} placeholder="title" />
      <Textarea
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
        videoFileUid={videoFileUid}
        setThumbnailFile={setEditThumbnailFile}
        setVideoFile={setEditVideoFile}
        thumbnailUrl={getFileDownloadUrl(portfolio.thumbnail)}
        videoUrl={
          portfolio.video ? getFileDownloadUrl(portfolio.video) : undefined
        }
        editVideoFile={editVideoFile}
        editThumbnailFile={editThumbnailFile}
      />
      <LabelForm label="참여자 아이디" className="mb-6">
        <UserSearchForm
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
        />
      </LabelForm>

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
