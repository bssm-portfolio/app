import { Portfolio } from "@/components";
import { useRouter } from "next/router";
import { usePortfolioList } from "@/models/portfolio";
import { useState } from "react";
import { Pagination } from "@/types/portfolio.interface";
import fixture from "@/fixtures";
import PaginationView from "../atoms/Pagination";

export default function MainPortfolioList() {
  const router = useRouter();
  // TODO: 페이지네이션 변수 이름 관련

  // 페이지네이션의 모순적인 부분
  // 일단 이 pagination을 받아 써야 하는데 이걸 state에 값 그대로 박기 하면 기본값(예외처리 한 값)이 박혀버림

  // 현재 문제점 1. usePortfolioList의 매개변수에 아무것도 안넣어서 refetch 불가능

  // 문제점 1 해결안 : nowPagination을 먼저 선언한다 => 그렇게 하면 moveToPage 쪽에서 문제가 생겨버림
  // page는 업데이트가 되는데 그 이외의 프로퍼티는 기본값이여서 받아올 수가 없음

  // 가장 무난한 해결법은 useEffect인데 usePortfolioList()여서 useEffect불가능

  const [nowPagination, setNowPagination] = useState<Pagination>(
    fixture.defaultPagination,
  );
  const { list: portfolioList, pagination } = usePortfolioList(nowPagination);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-12 flex-wrap">
        {portfolioList.map((portfolio) => (
          <Portfolio
            portfolio={portfolio}
            onClick={() => router.push(`/portfolio/${portfolio.portfolioId}`)}
            key={portfolio.portfolioId}
          />
        ))}
      </div>
      <PaginationView
        pagination={pagination}
        setPagination={setNowPagination}
      />
    </div>
  );
}
