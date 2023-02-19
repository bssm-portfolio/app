import { Pagination } from "@/types/portfolio.interface";
import { Dispatch, SetStateAction } from "react";
import Button from "./Button";

export default function PaginationView({
  pagination,
  setPagination,
}: {
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
}) {
  const moveByPagination = (pagination1: Pagination) => {
    setPagination(pagination1);
  };

  console.log(pagination);

  return (
    <div className="mt-3">
      {new Array(pagination.totalPages).fill(null).map((_, idx) => (
        <Button
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          disabled={idx + 1 === pagination.page}
          varient={idx + 1 === pagination.page ? "primary" : "secondary"}
          onClick={() => moveByPagination(pagination)}
        >
          {idx + 1}
        </Button>
      ))}
    </div>
  );
}
