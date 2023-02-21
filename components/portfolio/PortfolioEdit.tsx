import { useForm } from "react-hook-form";
import Input from "../atoms/Input";

export default function PortfolioEdit({
  portfolioId,
}: {
  portfolioId: number;
}) {
  const { register } = useForm();
  console.log(portfolioId);

  return (
    <div>
      <Input registerReturn={register("title")} />
      <Input registerReturn={register("description")} />
      <Input registerReturn={register("videoFileUid")} />
      <Input registerReturn={register("portfolioUrl")} />
      <Input registerReturn={register("thumbnailFileUid")} />
      <Input registerReturn={register("portfolioScope")} />
      <Input registerReturn={register("portfolioType")} />
      <Input registerReturn={register("gitUrl")} />
      <Input registerReturn={register("portfolioType")} />
      <Input registerReturn={register("skillList")} />
      <Input registerReturn={register("contributorIdList")} />
    </div>
  );
}
