interface PaginationProps {
  // Required props
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;

  // Optional props with defaults
  showPageNumbers?: boolean;
  showItemsCount?: boolean;
  variant?: "default" | "compact" | "minimal";
  className?: string;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  showPageNumbers = true,
  showItemsCount = true,
  variant = "default",
  className = "",
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (variant === "minimal") return [];

    const pages = [];
    const maxVisiblePages = variant === "compact" ? 5 : 7;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the start
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Don't render if only one page
  if (totalPages <= 1 && variant !== "minimal") {
    return null;
  }

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 ${className}`}
    >
      {/* Items count */}
      {showItemsCount && (
        <div className="text-sm text-gray-600">
          Showing {totalItems === 0 ? 0 : startIndex + 1} - {endIndex} of{" "}
          {totalItems} items
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded-md text-sm ${
            currentPage === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "hover:bg-gray-100 hover:border-gray-300"
          }`}
          aria-label="Previous page"
        >
          Prev
        </button>

        {/* Page numbers */}
        {showPageNumbers && pageNumbers.length > 0 && (
          <div className="hidden sm:flex items-center gap-1">
            {/* First page */}
            {pageNumbers[0] > 1 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
                >
                  1
                </button>
                {pageNumbers[0] > 2 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
              </>
            )}

            {/* Page numbers */}
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border rounded-md text-sm ${
                  page === currentPage
                    ? "bg-pink-600 text-white border-pink-600"
                    : "hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Last page */}
            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
        )}

        {/* Current page indicator for compact mode */}
        {variant === "compact" && (
          <div className="text-sm text-gray-600 px-2">
            Page {currentPage} of {totalPages}
          </div>
        )}

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded-md text-sm ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "hover:bg-gray-100 hover:border-gray-300"
          }`}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}
