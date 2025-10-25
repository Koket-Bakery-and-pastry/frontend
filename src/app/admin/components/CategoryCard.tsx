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
    <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Category Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {category.subCategories.length} sub-categories
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <Button
            onClick={() => onAddSubCategory(category)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1"
          >
            Add Sub
          </Button>
          <Button
            onClick={() => onEdit(category)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(category)}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1"
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Sub-categories List */}
      {category.subCategories.length > 0 ? (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Sub-categories:
          </h4>
          {category.subCategories.map((subCategory) => (
            <div
              key={subCategory.id}
              className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md"
            >
              <span className="text-sm text-gray-800">{subCategory.name}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => onEditSubCategory(category, subCategory.id)}
                  className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteSubCategory(category, subCategory.id)}
                  className="text-red-600 hover:text-red-800 text-xs px-2 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 text-sm bg-gray-50 rounded-md">
          No sub-categories added yet
        </div>
      )}
    </div>
  );
}
