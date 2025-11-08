import { Button } from "@/components/ui/button";

interface ProductsHeaderProps {
  title: string;
  onAddProduct: () => void;
  filterCount?: number;
  onToggleFilters?: () => void;
  showFilters?: boolean;
}

export default function ProductsHeader({
  title,
  onAddProduct,
  filterCount = 0,
  onToggleFilters,
  showFilters = false,
}: ProductsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 sm:px-8 lg:px-10 py-6 sm:py-8 w-full">
      <div className="flex-1">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#C967AC]">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        {/* Filters Toggle Button */}
        {onToggleFilters && (
          <Button
            size="sm"
            onClick={onToggleFilters}
            className={`bg-gray-500 hover:bg-gray-600 text-white md:px-4 md:py-2 px-3 py-2 rounded-md flex items-center gap-2 text-sm sm:text-sm ${
              filterCount > 0 ? "bg-orange-500 hover:bg-orange-600" : ""
            }`}
          >
            <span>Filters</span>
            {filterCount > 0 && (
              <span className="bg-white text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {filterCount}
              </span>
            )}
          </Button>
        )}

        {/* Add Product Button */}
        <Button
          size="sm"
          className="bg-[#C967AC] hover:bg-[#da78d6] text-white md:px-4 md:py-2 px-3 py-2 rounded-md flex items-center gap-2 text-sm sm:text-sm"
          aria-label="Add New Product"
          onClick={onAddProduct}
        >
          <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-white bg-white/10 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 sm:w-4 sm:h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </span>
          <span className="hidden sm:inline">Add New Product</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>
    </div>
  );
}
