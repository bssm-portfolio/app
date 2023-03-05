import Radio from "@/components/atoms/Radio";
import { PortfolioForm } from "@/types/portfolio.interface";
import { UseFormRegister } from "react-hook-form";

interface SubmitViewProps {
  register: UseFormRegister<PortfolioForm>;
  className?: string;
}

export default function SubmitView({
  register,
  className = "",
}: SubmitViewProps) {
  return (
    <div className={className}>
      <h2 className="text-base mb-large">공개범위</h2>
      <Radio
        registerReturn={register("portfolioScope", { required: "공개범위" })}
        id="entire"
        label="전체"
        value="PUBLIC"
        description="누구나 볼 수 있습니다."
      />
      <Radio
        registerReturn={register("portfolioScope", { required: "공개범위" })}
        id="part"
        label="일부"
        value="PROTECTED"
        description="링크가 있으면 누구든 볼 수 있습니다."
      />
      <Radio
        registerReturn={register("portfolioScope", { required: "공개범위" })}
        id="private"
        label="비공개"
        value="PRIVATE"
        description="나와 내가 선택한 사람만 볼 수 있습니다."
      />
    </div>
  );
}
