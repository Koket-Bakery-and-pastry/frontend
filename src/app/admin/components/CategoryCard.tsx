import { Category } from "../../types/category";
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onAddSubCategory: (category: Category) => void;
  onEditSubCategory: (category: Category, subCategoryId: string) => void;
  onDeleteSubCategory: (category: Category, subCategoryId: string) => void;
}

export default function CategoryCard({
  category,
  onEdit,
  onDelete,
  onAddSubCategory,
  onEditSubCategory,
  onDeleteSubCategory,
}: CategoryCardProps) {
  return (
    <div className="border rounded-lg p-4 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {category.subcategories.length} sub-categor
            {category.subcategories.length === 1 ? "y" : "ies"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:ml-4">
          <Button
            onClick={() => onAddSubCategory(category)}
            className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 flex-1 sm:flex-none min-w-[80px]"
          >
            <span className="hidden sm:inline">Add Sub</span>
            <span className="sm:hidden">+ Sub</span>
          </Button>
          <Button
            onClick={() => onEdit(category)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 flex-1 sm:flex-none min-w-[70px]"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(category)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 flex-1 sm:flex-none min-w-[80px]"
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Sub-categories List */}
      {category.subcategories.length > 0 ? (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Sub-categories:
          </h4>
          <div className="max-h-48 overflow-y-auto pr-2">
            {category.subcategories.map((subCategory) => (
              <div
                key={subCategory.id}
                className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2 py-2 px-3 bg-gray-50 rounded-md mb-2 last:mb-0"
              >
                <span className="text-sm text-gray-800 break-words flex-1">
                  {subCategory.name}
                </span>
                <div className="flex gap-2 self-end xs:self-auto">
                  <button
                    onClick={() => onEditSubCategory(category, subCategory.id)}
                    className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 border border-blue-200 rounded hover:bg-blue-50 transition-colors min-w-[50px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      onDeleteSubCategory(category, subCategory.id)
                    }
                    className="text-red-600 hover:text-red-800 text-xs px-2 py-1 border border-red-200 rounded hover:bg-red-50 transition-colors min-w-[50px]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 text-sm bg-gray-50 rounded-md">
          No sub-categories added yet
        </div>
      )}
    </div>
  );
}
