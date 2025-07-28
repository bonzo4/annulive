import Button from "./Button";

interface PaginationInfo {
  page: number;
  totalPages: number;
  total: number;
  hasPrev: boolean;
  hasNext: boolean;
}

interface PaginationProps {
  pagination: PaginationInfo;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  pagination,
  currentPage,
  onPageChange,
  className = "",
}: PaginationProps) {
  const { totalPages, hasPrev, hasNext } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center space-x-4 ${className}`}>
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
      >
        Previous
      </Button>

      <div className="flex items-center space-x-2">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum: number;

          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "primary" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageNum)}
              className="h-10 w-10 justify-center"
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
      >
        Next
      </Button>
    </div>
  );
}

interface PaginationInfoProps {
  currentItems: number;
  total: number;
  currentPage: number;
  totalPages: number;
  className?: string;
}

export function PaginationInfo({
  currentItems,
  total,
  currentPage,
  totalPages,
  className = "",
}: PaginationInfoProps) {
  return (
    <div
      className={`text-center text-sm text-amber-700 dark:text-amber-300 ${className}`}
    >
      Showing {currentItems} of {total} roadmaps
      {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
    </div>
  );
}
