import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "../ui/pagination";

interface SeminarPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    getPageNumbers: () => (number | string)[];
}

export const SeminarPagination: React.FC<SeminarPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    getPageNumbers,
}) => {
    if (totalPages <= 1) return null;

    return (
        <Pagination className="m-5">
            <PaginationContent className="gap-2">
                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(Math.max(1, currentPage - 1));
                        }}
                        aria-disabled={currentPage === 1}
                        tabIndex={currentPage === 1 ? -1 : 0}
                        className={`rounded-lg border border-purple-200 bg-white text-purple-600 font-semibold transition hover:bg-purple-50 hover:text-purple-700 focus:ring-2 focus:ring-purple-400
              ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                </PaginationItem>

                {/* Page numbers */}
                {getPageNumbers().map((page, idx) =>
                    page === "..." ? (
                        <PaginationItem key={idx}>
                            <PaginationEllipsis className="bg-transparent text-purple-400" />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === page}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(Number(page));
                                }}
                                className={`rounded-lg border border-purple-200 font-semibold transition
                  ${currentPage === page
                                        ? "bg-purple-600 text-white shadow-md"
                                        : "bg-white text-purple-600 hover:bg-purple-50 hover:text-purple-700"}
                  focus:ring-2 focus:ring-purple-400`}
                                style={{ minWidth: 40, minHeight: 40 }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(Math.min(totalPages, currentPage + 1));
                        }}
                        aria-disabled={currentPage === totalPages}
                        tabIndex={currentPage === totalPages ? -1 : 0}
                        className={`rounded-lg border border-purple-200 bg-white text-purple-600 font-semibold transition hover:bg-purple-50 hover:text-purple-700 focus:ring-2 focus:ring-purple-400
              ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
