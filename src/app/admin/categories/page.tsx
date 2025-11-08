"use client";
import { useState, useEffect } from "react";
import {
  Category,
  CreateCategoryDto,
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
} from "../../types/category";
import HeroSection from "../components/HeroSection";
import CategoryForm from "../components/CategoryForm";
import SubCategoryForm, {
  SubCategoryFormData,
} from "../components/SubCategoryForm";
import CategoriesGrid from "../components/CategoriesGrid";
import ConfirmationModal from "../components/ConfirmationModal";

const API_BASE_URL = "http://localhost:5001";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [addingSubCategory, setAddingSubCategory] = useState<Category | null>(
    null
  );
  const [editingSubCategory, setEditingSubCategory] = useState<{
    category: Category;
    subCategoryId: string;
    subCategoryData: any;
  } | null>(null);

  // Delete modals
  const [deleteCategoryModal, setDeleteCategoryModal] =
    useState<Category | null>(null);
  const [deleteSubCategoryModal, setDeleteSubCategoryModal] = useState<{
    category: Category;
    subCategoryId: string;
  } | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesResponse = await fetch(
          `${API_BASE_URL}/api/v1/categories`
        );
        if (!categoriesResponse.ok)
          throw new Error("Failed to fetch categories");

        const categoriesData = await categoriesResponse.json();
        setCategories(
          categoriesData.categories || categoriesData.data || categoriesData
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add new category
  const handleAddCategory = async (name: string) => {
    try {
      const createCategoryDto: CreateCategoryDto = {
        name: name.trim(),
        description: `Category for ${name}`,
      };

      const response = await fetch(`${API_BASE_URL}/api/v1/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createCategoryDto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create category");
      }

      const newCategory = await response.json();
      setCategories((prev) => [
        ...prev,
        newCategory.category || newCategory.data || newCategory,
      ]);
    } catch (err) {
      console.error("Error creating category:", err);
      setError(
        err instanceof Error ? err.message : "Failed to create category"
      );
    }
  };

  // Edit category
  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = async (name: string) => {
    if (!editingCategory) return;

    try {
      const updateCategoryDto = {
        name: name.trim(),
        description: `Updated category for ${name}`,
      };

      const response = await fetch(
        `${API_BASE_URL}/api/v1/categories/${editingCategory._id}`,
        {
          method: "PUT", // Changed to PUT based on your route
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateCategoryDto),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update category");
      }

      const updatedCategory = await response.json();
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === editingCategory._id
            ? {
                ...cat,
                ...(updatedCategory.category ||
                  updatedCategory.data ||
                  updatedCategory),
              }
            : cat
        )
      );
      setEditingCategory(null);
    } catch (err) {
      console.error("Error updating category:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update category"
      );
    }
  };

  // Delete category
  const handleDeleteCategory = async () => {
    if (!deleteCategoryModal) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/categories/${deleteCategoryModal._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category");
      }

      setCategories((prev) =>
        prev.filter((cat) => cat._id !== deleteCategoryModal._id)
      );
      setDeleteCategoryModal(null);
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(
        err instanceof Error ? err.message : "Failed to delete category"
      );
    }
  };

  // Add sub-category
  const handleAddSubCategory = (category: Category) => {
    setAddingSubCategory(category);
  };

  const handleCreateSubCategory = async (formData: SubCategoryFormData) => {
    if (!addingSubCategory) return;

    try {
      // Convert array of size-price objects to record
      const kilo_to_price_map: Record<string, number> = {};
      formData.kilo_to_price_map.forEach((item) => {
        if (item.size.trim() && item.price > 0) {
          kilo_to_price_map[item.size] = item.price;
        }
      });

      const createSubCategoryDto: CreateSubCategoryDto = {
        category_id: addingSubCategory._id,
        name: formData.name.trim(),
        status: formData.status,
        upfront_payment: formData.upfront_payment,
        is_pieceable: formData.is_pieceable,
        price: formData.price,
        ...(!formData.is_pieceable &&
          Object.keys(kilo_to_price_map).length > 0 && { kilo_to_price_map }),
      };

      const response = await fetch(`${API_BASE_URL}/api/v1/subcategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createSubCategoryDto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create sub-category");
      }

      const newSubCategory = await response.json();

      // Refresh categories to get updated data with subcategories
      const categoriesResponse = await fetch(
        `${API_BASE_URL}/api/v1/categories`
      );
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(
          categoriesData.categories || categoriesData.data || categoriesData
        );
      }

      setAddingSubCategory(null);
    } catch (err) {
      console.error("Error creating sub-category:", err);
      setError(
        err instanceof Error ? err.message : "Failed to create sub-category"
      );
    }
  };

  // Edit sub-category
  const handleEditSubCategory = (category: Category, subCategoryId: string) => {
    const subCategory = category.subcategories?.find(
      (sub) => sub._id === subCategoryId
    );
    if (subCategory) {
      // Convert kilo_to_price_map object to array for the form
      const kilo_to_price_map = subCategory.kilo_to_price_map
        ? Object.entries(subCategory.kilo_to_price_map).map(
            ([size, price]) => ({
              size,
              price,
            })
          )
        : [{ size: "", price: 0 }];

      setEditingSubCategory({
        category,
        subCategoryId,
        subCategoryData: {
          name: subCategory.name,
          status: subCategory.status,
          upfront_payment: subCategory.upfront_payment,
          price: subCategory.price,
          is_pieceable: subCategory.is_pieceable,
          kilo_to_price_map,
        },
      });
    }
  };

  const handleUpdateSubCategory = async (formData: SubCategoryFormData) => {
    if (!editingSubCategory) return;

    try {
      // Convert array of size-price objects to record
      const kilo_to_price_map: Record<string, number> = {};
      formData.kilo_to_price_map.forEach((item) => {
        if (item.size.trim() && item.price > 0) {
          kilo_to_price_map[item.size] = item.price;
        }
      });

      const updateSubCategoryDto: UpdateSubCategoryDto = {
        name: formData.name.trim(),
        status: formData.status,
        upfront_payment: formData.upfront_payment,
        is_pieceable: formData.is_pieceable,
        price: formData.price,
        ...(!formData.is_pieceable &&
          Object.keys(kilo_to_price_map).length > 0 && { kilo_to_price_map }),
      };

      const response = await fetch(
        `${API_BASE_URL}/api/v1/subcategories/${editingSubCategory.subCategoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateSubCategoryDto),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update sub-category");
      }

      const updatedSubCategory = await response.json();

      // Refresh categories to get updated data
      const categoriesResponse = await fetch(
        `${API_BASE_URL}/api/v1/categories`
      );
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(
          categoriesData.categories || categoriesData.data || categoriesData
        );
      }

      setEditingSubCategory(null);
    } catch (err) {
      console.error("Error updating sub-category:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update sub-category"
      );
    }
  };

  // Delete sub-category
  const handleDeleteSubCategory = async () => {
    if (!deleteSubCategoryModal) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/subcategories/${deleteSubCategoryModal.subCategoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete sub-category");
      }

      // Refresh categories to get updated data
      const categoriesResponse = await fetch(
        `${API_BASE_URL}/api/v1/categories`
      );
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(
          categoriesData.categories || categoriesData.data || categoriesData
        );
      }

      setDeleteSubCategoryModal(null);
    } catch (err) {
      console.error("Error deleting sub-category:", err);
      setError(
        err instanceof Error ? err.message : "Failed to delete sub-category"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title="Categories"
        subtitle="Track all categories in client page in one place"
        iconSrc="../../../../assets/category-icon.png"
        iconAlt="category icon"
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 mt-4 sm:mt-6">
        <section className="bg-white border-2 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 w-full">
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#C967AC]">
                All Categories
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 max-w-2xl mx-auto sm:mx-0">
                This is your main category management section. You can now
                manage categories easily using the forms below.
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-4 lg:p-6 bg-[#FFFAFF]">
            {/* Add/Edit Category Form */}
            {editingCategory ? (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                  Edit Category
                </h3>
                <CategoryForm
                  onSubmit={handleUpdateCategory}
                  placeholder="Enter category name"
                  buttonText="Update Category"
                  initialValue={editingCategory.name}
                  onCancel={() => setEditingCategory(null)}
                />
              </div>
            ) : (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                  Add New Category
                </h3>
                <CategoryForm
                  onSubmit={handleAddCategory}
                  placeholder="Enter category name"
                  buttonText="Add Category"
                />
              </div>
            )}

            {/* Add Sub-category Form */}
            {addingSubCategory && (
              <div className="mb-6 sm:mb-8 p-4 sm:p-6 border border-gray-200 rounded-lg bg-white">
                <SubCategoryForm
                  onSubmit={handleCreateSubCategory}
                  onCancel={() => setAddingSubCategory(null)}
                  categoryName={addingSubCategory.name}
                />
              </div>
            )}

            {/* Edit Sub-category Form */}
            {editingSubCategory && (
              <div className="mb-6 sm:mb-8 p-4 sm:p-6 border border-gray-200 rounded-lg bg-white">
                <SubCategoryForm
                  onSubmit={handleUpdateSubCategory}
                  onCancel={() => setEditingSubCategory(null)}
                  initialData={editingSubCategory.subCategoryData}
                  categoryName={editingSubCategory.category.name}
                  isEditing={true}
                />
              </div>
            )}

            {/* Categories Grid */}
            <CategoriesGrid
              categories={categories}
              onEditCategory={handleEditCategory}
              onDeleteCategory={(category) => setDeleteCategoryModal(category)}
              onAddSubCategory={handleAddSubCategory}
              onEditSubCategory={handleEditSubCategory}
              onDeleteSubCategory={(category, subCategoryId) =>
                setDeleteSubCategoryModal({ category, subCategoryId })
              }
            />
          </div>
        </section>
      </main>

      {/* Delete Category Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteCategoryModal}
        title="Are you sure?"
        message="This action cannot be undone. This will permanently delete the category and all its sub-categories from your shop."
        confirmText="Delete Category"
        onConfirm={handleDeleteCategory}
        onCancel={() => setDeleteCategoryModal(null)}
      />

      {/* Delete Sub-category Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteSubCategoryModal}
        title="Are you sure?"
        message="This action cannot be undone. This will permanently delete the sub-category from your shop."
        confirmText="Delete Sub-category"
        onConfirm={handleDeleteSubCategory}
        onCancel={() => setDeleteSubCategoryModal(null)}
      />
    </div>
  );
}
