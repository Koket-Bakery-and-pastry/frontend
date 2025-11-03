"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product, UpdateProductDto } from "../../../../types/product";

const API_BASE_URL = "http://localhost:5001";

interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  name: string;
  category_id: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  // Fetch product data, categories, and subcategories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch product
        const productResponse = await fetch(
          `${API_BASE_URL}/api/v1/products/${id}`
        );
        if (!productResponse.ok) throw new Error("Failed to fetch product");
        const productData = await productResponse.json();
        setProduct(productData.product || productData.data || productData);

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
        alert("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleInputChange = (field: keyof UpdateProductDto, value: string) => {
    if (product) {
      setProduct((prev) => (prev ? { ...prev, [field]: value } : null));
    }
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
    if (!product) return;
    setSubmitting(true);

    try {
      const formData = new FormData();

      // Append updated product data
      if (product.name) formData.append("name", product.name);
      if (product.description)
        formData.append("description", product.description);
      if (product.category_id)
        formData.append("category_id", product.category_id);
      if (product.subcategory_id)
        formData.append("subcategory_id", product.subcategory_id);

      // Append image file if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      const result = await response.json();
      alert("Product updated successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert(
        error instanceof Error ? error.message : "Failed to update product"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Get filtered subcategories based on selected category
  const filteredSubcategories = product?.category_id
    ? subcategories.filter((sub) => sub.category_id === product.category_id)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/admin/products")}
            className="px-4 py-2 rounded-full bg-pink-500 text-white text-sm hover:bg-pink-600"
          >
            Back to Products
          </button>
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
          <h1 className="text-3xl font-bold mb-2">Edit Product</h1>
          <p className="text-sm text-gray-600 mb-6">
            Update the details of your product
          </p>

          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              value={product.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
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
              value={product.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
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
              value={product.category_id}
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
              value={product.subcategory_id}
              onChange={(e) =>
                handleInputChange("subcategory_id", e.target.value)
              }
              className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
              disabled={
                !product.category_id || filteredSubcategories.length === 0
              }
              required
            >
              <option value="">
                {product.category_id && filteredSubcategories.length > 0
                  ? "Select subcategory"
                  : product.category_id
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

            {/* Current Image */}
            {product.image_url && !imagePreview && (
              <div className="mb-3 flex items-start gap-3">
                <img
                  src={`${API_BASE_URL}${product.image_url}`}
                  alt="Current product"
                  className="w-28 h-28 object-cover rounded border"
                />
                <p className="text-sm text-gray-700">Current image</p>
              </div>
            )}

            {/* New Image Upload */}
            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white"
            />

            {/* New Image Preview */}
            {imagePreview && (
              <div className="mt-3 flex items-start gap-3">
                <img
                  src={imagePreview}
                  alt="New preview"
                  className="w-28 h-28 object-cover rounded border"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-2">
                    {imageFile?.name || "New image preview"}
                  </p>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="px-3 py-1 rounded-full border bg-white text-sm hover:bg-gray-50"
                  >
                    Remove New Image
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="px-4 py-2 rounded-full border bg-white text-sm hover:bg-gray-50"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-pink-500 text-white text-sm hover:bg-pink-600 disabled:opacity-70"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
