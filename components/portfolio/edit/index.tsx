import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/models/portfolio";
import { Skill } from "@/types/skill.interface";
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
      if (data.portfolioUrl.length > 0 && (videoFileUid || editVideoFile))
        return "ALL";
      if (data.portfolioUrl.length > 0) return "URL";
      return "VIDEO";
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
    <form className="flex flex-col items-center gap-3 p-12">
      <div className="max-w-[25rem]">
        <h1 className="w-full mb-8 font-bold text-xl">포트폴리오 수정</h1>
        <LabelForm label="제목" className="mb-4">
          <Input
            className="w-full"
            registerReturn={register("title", { required: "제목" })}
            placeholder="제목"
          />
        </LabelForm>
        <LabelForm label="설명" className="mb-4">
          <Textarea
            className="w-full"
            registerReturn={register("description", { required: "설명" })}
            placeholder="설명"
          />
        </LabelForm>
        <LabelForm label="웹 주소" className="mb-4">
          <Input
            className="w-full"
            registerReturn={register("portfolioUrl")}
            placeholder="웹 주소"
          />
        </LabelForm>

        <hr className="my-6" />

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

        <hr className="my-6" />

        <LabelForm label="참여자 아이디" className="mb-4">
          <UserSearchForm
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
          />
        </LabelForm>

        <hr className="my-6" />

        <LabelForm label="Github 주소" className="mb-4">
          <Input
            className="w-full"
            registerReturn={register("gitUrl")}
            placeholder="깃허브 주소"
          />
        </LabelForm>

        <LabelForm label="기술 스택" className="mb-4">
          <SkillForm
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
          />
        </LabelForm>

        <hr className="my-6" />

        <LabelForm label="테마" className="mb-4">
          <Select
            placeholder="테마를 선택하세요."
            options={config.portfolioThemeOptions}
            setValue={(option: Option) =>
              setValue("portfolioTheme", option.value as PortfolioTheme)
            }
          />
        </LabelForm>

        <hr className="my-6" />

        <ScopeView register={register} scope={portfolio.scope} />

        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit(onValid, onInValid)}
        >
          수정하기
        </Button>
      </div>
    </form>
  );
}
