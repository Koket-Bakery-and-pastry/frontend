import { useState, useEffect } from "react";
import { ProductFilters as ProductFiltersType } from "../../types/product";
import { Button } from "@/components/ui/button";

const API_BASE_URL = "http://localhost:5001";

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onFilterChange: (filters: ProductFiltersType) => void;
  onClearFilters: () => void;
}

interface Category {
  _id: string;
  name: string;
  subcategories?: SubCategory[];
}

interface SubCategory {
  _id: string;
  name: string;
  category_id: string;
}

export default function ProductFiltersComponent({
  filters,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories and subcategories for filter options
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setLoading(true);

        // Fetch categories
        const categoriesResponse = await fetch(
          `${API_BASE_URL}/api/v1/categories`
        );
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(
            categoriesData.categories || categoriesData.data || categoriesData
          );
        }

        // Fetch subcategories
        const subcategoriesResponse = await fetch(
          `${API_BASE_URL}/api/v1/subcategories`
        );
        if (subcategoriesResponse.ok) {
          const subcategoriesData = await subcategoriesResponse.json();
          setSubcategories(
            subcategoriesData.subcategories ||
              subcategoriesData.data ||
              subcategoriesData
          );
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    const newFilters = { ...filters, categoryId: categoryId || undefined };
    // Clear subcategory when category changes
    delete newFilters.subcategoryId;
    onFilterChange(newFilters);
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    onFilterChange({
      ...filters,
      subcategoryId: subcategoryId || undefined,
    });
  };

  // Get subcategories for the selected category
  const filteredSubcategories = filters.categoryId
    ? subcategories.filter((sub) => sub.category_id === filters.categoryId)
    : [];

  const hasActiveFilters = filters.categoryId || filters.subcategoryId;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
        <span className="ml-2 text-sm text-gray-600">Loading filters...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-sm font-medium text-gray-700">Filter Products</h3>
        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1"
            size="sm"
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.categoryId || ""}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subcategory
          </label>
          <select
            value={filters.subcategoryId || ""}
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            disabled={!filters.categoryId || filteredSubcategories.length === 0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
          >
            <option value="">All Subcategories</option>
            {filteredSubcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
          {filters.categoryId && filteredSubcategories.length === 0 && (
            <p className="text-xs text-gray-500 mt-1">
              No subcategories available for this category
            </p>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2">
          {filters.categoryId && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              Category:{" "}
              {categories.find((c) => c._id === filters.categoryId)?.name}
              <button
                onClick={() => handleCategoryChange("")}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.subcategoryId && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              Subcategory:{" "}
              {subcategories.find((s) => s._id === filters.subcategoryId)?.name}
              <button
                onClick={() => handleSubcategoryChange("")}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
