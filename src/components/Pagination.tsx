"use client";

import { useRouter, useSearchParams } from "next/navigation";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
};

export const Pagination = ({
  currentPage,
  totalPages,
}: PaginationControlsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    router.push(`?${newParams.toString()}`);
  };

  const prevPage = currentPage > 1;
  const nextPage = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-4 my-8">
      <button
        type="button"
        disabled={!prevPage}
        onClick={() => handlePageChange(currentPage - 1)}
        className="bg-black text-white px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        disabled={!nextPage}
        onClick={() => handlePageChange(currentPage + 1)}
        className="bg-black text-white px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};
