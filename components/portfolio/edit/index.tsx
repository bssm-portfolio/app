import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/models/portfolio";
import { Skill } from "@/types/skill.interface";
import { useRouter } from "next/router";
import {
  PortfolioForm,
  PortfolioTheme,
  PortfolioType,
} from "@/types/portfolio.interface";
import httpClient from "@/apis";
import Select, { Option } from "@/components/common/Select";
import config from "@/config";
import { getFileDownloadUrl, getFileUidByFileUpload } from "@/utils/file";
import Textarea from "@/components/atoms/Textarea";
import useOverlay from "@/hooks/useOverlay";
import { Member } from "@/types/member.interface";
import UserSearchForm from "@/components/common/UserSearchForm";
import LabelForm from "@/components/atoms/LabelForm";
import { getErrorProperty } from "@/utils/input";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import SkillForm from "../../common/SkillForm";
import EditFileUploadView from "./EditFileUploadView";
import ScopeView from "./ScopeView";

interface PortfolioEditProps {
  portfolioId: number;
}

export default function PortfolioEdit({ portfolioId }: PortfolioEditProps) {
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [editThumbnailFile, setEditThumbnailFile] = useState<File>();
  const [editVideoFile, setEditVideoFile] = useState<File>();
  const [thumbnailFileUid, setThumbnailFileUid] = useState<string>("");
  const [videoFileUid, setVideoFileUid] = useState<string>("");
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  const { openToast } = useOverlay();
  const { data: portfolio } = usePortfolio(portfolioId);
  const { register, handleSubmit, reset, setValue } = useForm<PortfolioForm>({
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
      .then(() => {
        openToast("수정이 완료되었습니다.");

        httpClient.revalidatePortfolio
          .post(
            { portfolioId },
            { baseURL: `${config.clientUrl}/api/revalidate-portfolio` },
          )
          .then(() => {
            window.location.href = `/portfolio/${portfolioId}`;
          });
      })
      .catch((error) =>
        openToast(error.response.data.message, { type: "danger" }),
      );
  };

  const onInValid: SubmitErrorHandler<PortfolioForm> = (inValidData) => {
    openToast(
      `${getErrorProperty<PortfolioForm>(inValidData)}을(를) 확인해주세요.`,
      {
        type: "danger",
      },
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
    <form className="flex flex-col gap-3 p-12">
      <Input
        registerReturn={register("title", { required: "제목" })}
        placeholder="제목"
      />
      <Textarea
        registerReturn={register("description", { required: "소개" })}
        placeholder="소개"
      />
      <Input registerReturn={register("portfolioUrl")} placeholder="웹 주소" />

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
      <LabelForm label="참여자 아이디">
        <UserSearchForm
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
        />
      </LabelForm>

      <Input registerReturn={register("gitUrl")} placeholder="깃허브 주소" />

      <SkillForm
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
      />

      <Select
        options={config.portfolioThemeOptions}
        setValue={(option: Option) =>
          setValue("portfolioTheme", option.value as PortfolioTheme)
        }
      />

      <ScopeView register={register} scope={portfolio.scope} />

      <Button type="submit" onClick={handleSubmit(onValid, onInValid)}>
        수정하기
      </Button>
    </form>
  );
}
