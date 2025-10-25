"use client";
import { useState } from "react";
import { Category, SubCategory } from "../../types/category";
import HeroSection from "../components/HeroSection";
import CategoryForm from "../components/CategoryForm";
import CategoriesGrid from "../components/CategoriesGrid";
import ConfirmationModal from "../components/ConfirmationModal";
import { initialCategories } from "@/app/data/mockCategories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [addingSubCategory, setAddingSubCategory] = useState<Category | null>(
    null
  );
  const [editingSubCategory, setEditingSubCategory] = useState<{
    category: Category;
    subCategoryId: string;
  } | null>(null);

  // Delete modals
  const [deleteCategoryModal, setDeleteCategoryModal] =
    useState<Category | null>(null);
  const [deleteSubCategoryModal, setDeleteSubCategoryModal] = useState<{
    category: Category;
    subCategoryId: string;
  } | null>(null);

  // Add new category
  const handleAddCategory = (name: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      subcategories: [],
      createdAt: new Date().toISOString(),
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  // Edit category
  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = (name: string) => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, name } : cat
        )
      );
      setEditingCategory(null);
    }
  };

  // Delete category
  const handleDeleteCategory = () => {
    if (deleteCategoryModal) {
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== deleteCategoryModal.id)
      );
      setDeleteCategoryModal(null);
    }
  };

  // Add sub-category
  const handleAddSubCategory = (category: Category) => {
    setAddingSubCategory(category);
  };

  const handleCreateSubCategory = (name: string) => {
    if (addingSubCategory) {
      const newSubCategory: SubCategory = {
        id: `${addingSubCategory.id}-${Date.now()}`,
        name,
        parentCategory: addingSubCategory.id,
        createdAt: new Date().toISOString(),
      };

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === addingSubCategory.id
            ? { ...cat, subcategories: [...cat.subcategories, newSubCategory] }
            : cat
        )
      );
      setAddingSubCategory(null);
    }
  };

  // Edit sub-category
  const handleEditSubCategory = (category: Category, subCategoryId: string) => {
    setEditingSubCategory({ category, subCategoryId });
  };

  const handleUpdateSubCategory = (name: string) => {
    if (editingSubCategory) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingSubCategory.category.id
            ? {
                ...cat,
                subcategories: cat.subcategories.map((sub) =>
                  sub.id === editingSubCategory.subCategoryId
                    ? { ...sub, name }
                    : sub
                ),
              }
            : cat
        )
      );
      setEditingSubCategory(null);
    }
  };

  // Delete sub-category
  const handleDeleteSubCategory = () => {
    if (deleteSubCategoryModal) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === deleteSubCategoryModal.category.id
            ? {
                ...cat,
                subcategories: cat.subcategories.filter(
                  (sub) => sub.id !== deleteSubCategoryModal.subCategoryId
                ),
              }
            : cat
        )
      );
      setDeleteSubCategoryModal(null);
    }
  };

  // Get current sub-category name for editing
  const getEditingSubCategoryName = () => {
    if (!editingSubCategory) return "";
    const category = categories.find(
      (cat) => cat.id === editingSubCategory.category.id
    );
    const subCategory = category?.subcategories.find(
      (sub) => sub.id === editingSubCategory.subCategoryId
    );
    return subCategory?.name || "";
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title="Categories"
        subtitle="Track all categories in client page in one place"
        iconSrc="../../../../assets/category-icon.png" // Add your category icon
        iconAlt="category icon"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <section className="bg-white border-2 rounded-3xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 sm:px-8 lg:px-10 py-6 sm:py-8 w-full">
            <div>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#C967AC]">
                All Categories
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                This is your main category management section. You can now
                manage categories easily using the forms below.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-[#FFFAFF]">
            {/* Add/Edit Category Form */}
            {editingCategory ? (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Edit Category</h3>
                <CategoryForm
                  onSubmit={handleUpdateCategory}
                  placeholder="Enter category name"
                  buttonText="Update Category"
                  initialValue={editingCategory.name}
                  onCancel={() => setEditingCategory(null)}
                />
              </div>
            ) : (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
                <CategoryForm
                  onSubmit={handleAddCategory}
                  placeholder="Enter category name"
                  buttonText="Add Category"
                />
              </div>
            )}

            {/* Add Sub-category Form */}
            {addingSubCategory && (
              <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-lg font-semibold mb-4">
                  Add Sub-category to {addingSubCategory.name}
                </h3>
                <CategoryForm
                  onSubmit={handleCreateSubCategory}
                  placeholder="Enter sub-category name"
                  buttonText="Add Sub-category"
                  onCancel={() => setAddingSubCategory(null)}
                />
              </div>
            )}

            {/* Edit Sub-category Form */}
            {editingSubCategory && (
              <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-lg font-semibold mb-4">
                  Edit Sub-category
                </h3>
                <CategoryForm
                  onSubmit={handleUpdateSubCategory}
                  placeholder="Enter sub-category name"
                  buttonText="Update Sub-category"
                  initialValue={getEditingSubCategoryName()}
                  onCancel={() => setEditingSubCategory(null)}
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
