"use client"
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { getPagesToShow } from "@/utils/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationWrapper: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Compute which pages to display (with ellipses)
  const pagesToShow = getPagesToShow(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
            disabled={currentPage <= 1}
          />
        </PaginationItem>
        {pagesToShow.map((pg, index) =>
          pg === -1 ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pg}>
              <PaginationLink
                href="#"
                isActive={pg === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pg);
                }}
              >
                {pg}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
            disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationWrapper;
