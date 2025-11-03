"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreateProductDto } from "../../../types/product";

const API_BASE_URL = "http://localhost:5001";

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

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [productData, setProductData] = useState<CreateProductDto>({
    name: "",
    description: "",
    category_id: "",
    subcategory_id: "",
    image_url: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchData = async () => {
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
        console.error("Error fetching data:", error);
        alert("Failed to load categories and subcategories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Clear subcategory when category changes
  useEffect(() => {
    setProductData((prev) => ({ ...prev, subcategory_id: "" }));
  }, [productData.category_id]);

  const handleInputChange = (field: keyof CreateProductDto, value: string) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImagePreview("");
      return;
    }

    setImageFile(file);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    const fileInput = document.getElementById(
      "product-image"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Validation
    if (
      !(productData.name ?? "").trim() ||
      !(productData.description ?? "").trim() ||
      !productData.category_id ||
      !productData.subcategory_id
    ) {
      alert(
        "Please fill all required fields: Product Name, Description, Category, and Subcategory"
      );
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();

      // Append product data
      formData.append("name", productData.name ?? "");
      formData.append("description", productData.description ?? "");
      formData.append("category_id", productData.category_id ?? "");
      formData.append("subcategory_id", productData.subcategory_id ?? "");

      // Append image file if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/products`, {
        method: "POST",
        body: formData,
        // Note: Don't set Content-Type header when using FormData - browser will set it automatically with boundary
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product");
      }

      const result = await response.json();
      alert("Product created successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
      alert(
        error instanceof Error ? error.message : "Failed to create product"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setProductData({
      name: "",
      description: "",
      category_id: "",
      subcategory_id: "",
      image_url: "",
    });
    setImageFile(null);
    setImagePreview("");
  };

  // Get filtered subcategories based on selected category
  const filteredSubcategories = productData.category_id
    ? subcategories.filter((sub) => sub.category_id === productData.category_id)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
          <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
          <p className="text-sm text-gray-600 mb-6">
            Fill in the details to add a new product to your shop
          </p>

          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              value={productData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="eg. Chocolate Cake, Vanilla Cake, etc."
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={productData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your product..."
              rows={4}
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={productData.category_id}
              onChange={(e) => handleInputChange("category_id", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Subcategory <span className="text-red-500">*</span>
            </label>
            <select
              value={productData.subcategory_id}
              onChange={(e) =>
                handleInputChange("subcategory_id", e.target.value)
              }
              className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
              disabled={
                !productData.category_id || filteredSubcategories.length === 0
              }
              required
            >
              <option value="">
                {productData.category_id && filteredSubcategories.length > 0
                  ? "Select subcategory"
                  : productData.category_id
                  ? "No subcategories available"
                  : "Select a category first"}
              </option>
              {filteredSubcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Product Image
            </label>
            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white"
            />

            {imagePreview && (
              <div className="mt-3 flex items-start gap-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-28 h-28 object-cover rounded border"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-2">
                    {imageFile?.name || "Selected image"}
                  </p>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="px-3 py-1 rounded-full border bg-white text-sm hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-full border bg-white text-sm hover:bg-gray-50"
              disabled={submitting}
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-pink-500 text-white text-sm hover:bg-pink-600 disabled:opacity-70"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
