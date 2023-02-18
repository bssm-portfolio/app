import { Portfolio } from "@/types/portfolio.interface";
import { Portfolio as PortfolioView } from "@/components/";
import { useRouter } from "next/router";
import RoundPlusIcon from "@/components/Icon/RoundPlusIcon";
import useModal from "@/hooks/useModal";
import UploadModal from "../UploadModal";

interface ProfilePagePortfolioListProps {
  portfolioList: Portfolio[];
  isMypage?: boolean;
}

export default function ProfilePagePortfolioList({
  portfolioList,
  isMypage,
}: ProfilePagePortfolioListProps) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const openUploadModal = () =>
    openModal({
      title: "업로드",
      content: <UploadModal closeModal={closeModal} />,
    });

  return (
    <div className="flex flex-wrap gap-12 ml-[4.5rem]">
      {portfolioList.map((portfolio) => {
        return (
          <PortfolioView
            portfolio={portfolio}
            onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
            key={portfolio.portfolioId}
          />
        );
      })}
      {isMypage && (
        <div
          className="w-[320px] h-[180px] flex items-center justify-center rounded-md border border-blue cursor-pointer"
          onClick={openUploadModal}
        >
          <div className="flex flex-col items-center">
            <RoundPlusIcon />
            <span className="text-blue">업로드</span>
          </div>
        </div>
      )}
    </div>
  );
}
