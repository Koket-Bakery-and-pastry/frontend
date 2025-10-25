interface CustomerFiltersProps {
  search: string;
  onSearchChange: (search: string) => void;
  onClearFilters: () => void;
}

export default function CustomerFilters({
  search,
  onSearchChange,
  onClearFilters,
}: CustomerFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Name, email, or user ID"
        className="border px-4 py-3 rounded-md flex-1 text-sm sm:text-base"
      />
      <button
        onClick={onClearFilters}
        className="border px-4 py-3 rounded-md text-sm sm:text-base hover:bg-gray-100 w-full sm:w-auto"
      >
        Clear Filters
      </button>
    </div>
  );
}
