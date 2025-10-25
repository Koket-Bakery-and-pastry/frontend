"use client";
import { initialCategories } from "@/app/data/mockCategories";
import { Category } from "@/app/types/category";
import { init } from "next/dist/compiled/webpack/webpack";
import React, { useState, useEffect } from "react";

export default function AddProductPage() {
  const categories = initialCategories;

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [featured, setFeatured] = useState("No");
  const [inStock, setInStock] = useState("Yes");
  const [submitting, setSubmitting] = useState(false);

  // clear subcategory when category changes
  useEffect(() => {
    setSubCategory("");
  }, [category]);

  const resetForm = () => {
    setProductName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setSubCategory("");
    setImageUrl("");
    setFeatured("No");
    setInStock("Yes");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const selectedCategory = categories.find((c) => c.id === category);
    const requiresSub = Boolean(
      selectedCategory &&
        selectedCategory.subcategories &&
        selectedCategory.subcategories.length > 0
    );

    if (
      !productName.trim() ||
      !description.trim() ||
      !price.trim() ||
      !category ||
      (requiresSub && !subCategory)
    ) {
      alert(
        "Please fill required fields: Product Name, Description, Price, Category" +
          (requiresSub ? " and Subcategory." : ".")
      );
      setSubmitting(false);
      return;
    }

    const payload = {
      productName,
      description,
      price,
      category,
      subCategory: subCategory || null,
      imageUrl,
      featured: featured === "Yes",
      inStock: inStock === "Yes",
    };

    console.log("Submitting product:", payload);
    await new Promise((r) => setTimeout(r, 600));
    alert("Product submitted (check console)");
    resetForm();
    setSubmitting(false);
  };

  const selectedCategory = categories.find((c) => c.id === category);

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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="eg. Cakes, Quick Bread, Cookies and Fondant Cake."
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Colourful layers of vanilla cake with butter cream"
              rows={4}
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$300"
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Subcategory{" "}
              {selectedCategory &&
              selectedCategory.subcategories &&
              selectedCategory.subcategories.length > 0 ? (
                <span className="text-red-500">*</span>
              ) : null}
            </label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
              disabled={
                !selectedCategory ||
                !selectedCategory.subcategories ||
                selectedCategory.subcategories.length === 0
              }
            >
              <option value="">
                {selectedCategory &&
                selectedCategory.subcategories &&
                selectedCategory.subcategories.length > 0
                  ? "Select subcategory"
                  : "No subcategories"}
              </option>
              {selectedCategory?.subcategories?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Image Upload (Optional)
            </label>

            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) {
                  // clear preview if no file
                  if (imageUrl && imageUrl.startsWith("blob:"))
                    URL.revokeObjectURL(imageUrl);
                  setImageUrl("");
                  return;
                }

                // revoke previous object URL to avoid memory leaks
                if (imageUrl && imageUrl.startsWith("blob:"))
                  URL.revokeObjectURL(imageUrl);

                // store a preview URL in imageUrl (string) for now;
                // later you can read the File from the input (#product-image) and append to FormData
                const previewUrl = URL.createObjectURL(file);
                setImageUrl(previewUrl);
              }}
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white"
            />

            {imageUrl ? (
              <div className="mt-3 flex items-start gap-3">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-28 h-28 object-cover rounded border"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-2">
                    {(
                      document.getElementById(
                        "product-image"
                      ) as HTMLInputElement | null
                    )?.files?.[0]?.name ?? "Selected image"}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (imageUrl && imageUrl.startsWith("blob:"))
                          URL.revokeObjectURL(imageUrl);
                        setImageUrl("");
                        const fileInput = document.getElementById(
                          "product-image"
                        ) as HTMLInputElement | null;
                        if (fileInput) fileInput.value = "";
                      }}
                      className="px-3 py-1 rounded-full border bg-white text-sm hover:bg-gray-50"
                    >
                      Remove
                    </button>
                    <p className="text-xs text-gray-500 self-center">
                      File will be available from the input with
                      id="product-image". When ready, use FormData to send the
                      file to your backend.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-2">
                Choose an image to upload (preview shown). Backend integration:
                read the file from the file input and append to FormData.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Featured Product
              </label>
              <select
                value={featured}
                onChange={(e) => setFeatured(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">In Stock</label>
              <select
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
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
              {submitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
