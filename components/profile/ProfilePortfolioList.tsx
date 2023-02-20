import { Portfolio } from "@/components";
import { useRouter } from "next/router";
import { usePortfolioList } from "@/models/portfolio";
import useModal from "@/hooks/useModal";
import PlusIcon from "../Icon/PlusIcon";
import UploadModal from "../app/UploadModal";

export default function ProfilePortfolioList() {
  const router = useRouter();
  const { pages } = usePortfolioList({ size: 12, page: 1 }, {});
  const { openModal, closeModal } = useModal();

  return (
    <div className="flex gap-12 flex-wrap">
      {pages.map((page) =>
        page.list.map((portfolio) => (
          <Portfolio
            portfolio={portfolio}
            onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
            key={portfolio.portfolioId}
          />
        )),
      )}
      <div
        onClick={() =>
          openModal({
            title: "업로드",
            content: <UploadModal closeModal={closeModal} />,
          })
        }
        className="flex-1 flex flex-col items-center justify-center border border-blue text-blue font-bold rounded-lg h-[15rem] cursor-pointer"
      >
        <PlusIcon />
        업로드
      </div>
    </div>
  );
}
