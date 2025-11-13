"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
  status: string;
  kilo_to_price_map?: Record<string, number>;
  upfront_payment: number;
  is_pieceable: boolean;
  price: number;
  created_at: string;
}

interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  subcategoryId: string;
  images: string[];
  stock: number;
  size?: string; // For weight-based products
  quantity?: number; // For pieceable products
}

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [productData, setProductData] = useState<CreateProductDto>({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
    subcategoryId: "",
    images: [],
    stock: 0,
    size: "",
    quantity: 1,
  });

  const [selectedSubcategory, setSelectedSubcategory] =
    useState<SubCategory | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const categoriesResponse = await fetch(
          `${API_BASE_URL}/api/v1/categories`
        );
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(
          categoriesData.categories || categoriesData.data || categoriesData
        );

        // Fetch subcategories
        const subcategoriesResponse = await fetch(
          `${API_BASE_URL}/api/v1/subcategories`
        );
        if (!subcategoriesResponse.ok) {
          throw new Error("Failed to fetch subcategories");
        }
        const subcategoriesData = await subcategoriesResponse.json();
        setSubcategories(
          subcategoriesData.subcategories ||
            subcategoriesData.data ||
            subcategoriesData
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load categories and subcategories";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle subcategory selection
  useEffect(() => {
    if (productData.subcategoryId) {
      const subcategory = subcategories.find(
        (sub) => sub._id === productData.subcategoryId
      );
      setSelectedSubcategory(subcategory || null);

      // Reset size and quantity when subcategory changes
      setProductData((prev) => ({
        ...prev,
        size: "",
        quantity: 1,
        price: subcategory?.price || 0,
      }));
    } else {
      setSelectedSubcategory(null);
    }
  }, [productData.subcategoryId, subcategories]);

  // Clear subcategory when category changes
  useEffect(() => {
    setProductData((prev) => ({
      ...prev,
      subcategoryId: "",
      size: "",
      quantity: 1,
      price: 0,
    }));
    setSelectedSubcategory(null);
  }, [productData.categoryId]);

  const handleInputChange = (
    field: keyof CreateProductDto,
    value: string | number
  ) => {
    setProductData((prev) => ({ ...prev, [field]: value }));

    // Recalculate price if size changes for weight-based products
    if (field === "size" && selectedSubcategory?.kilo_to_price_map && value) {
      const newPrice = selectedSubcategory.kilo_to_price_map[value as string];
      if (newPrice) {
        setProductData((prev) => ({ ...prev, price: newPrice }));
      }
    }

    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImagePreview("");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      const message = "Please select a valid image file";
      setError(message);
      toast.error(message);
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      const message = "Image size should be less than 5MB";
      setError(message);
      toast.error(message);
      return;
    }

    setImageFile(file);
    setError(null);

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
    setError(null);
  };

  const uploadImage = async (file: File): Promise<string> => {
    // For now, we'll create a placeholder URL
    // In a real application, you would upload to your CDN/cloud storage
    return URL.createObjectURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Validation
    if (
      !productData.name?.trim() ||
      !productData.description?.trim() ||
      !productData.categoryId ||
      !productData.subcategoryId ||
      productData.price <= 0
    ) {
      const message =
        "Please fill all required fields: Product Name, Description, Category, and Subcategory";
      setError(message);
      toast.error(message);
      setSubmitting(false);
      return;
    }

    // Additional validation based on subcategory type
    if (!selectedSubcategory?.is_pieceable && !productData.size) {
      const message = "Please select a size for this product";
      setError(message);
      toast.error(message);
      setSubmitting(false);
      return;
    }

    if (
      selectedSubcategory?.is_pieceable &&
      (!productData.quantity || productData.quantity < 1)
    ) {
      const message = "Please enter a valid quantity";
      setError(message);
      toast.error(message);
      setSubmitting(false);
      return;
    }

    try {
      let imageUrls: string[] = [];

      // Upload image if selected
      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        imageUrls = [imageUrl];
      }

      // Prepare request body according to API schema
      const requestBody = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        categoryId: productData.categoryId,
        subcategoryId: productData.subcategoryId,
        images: imageUrls,
        stock: productData.stock || 0,
        // Include additional fields based on subcategory type
        ...(selectedSubcategory && {
          is_pieceable: selectedSubcategory.is_pieceable,
          upfront_payment: selectedSubcategory.upfront_payment,
          ...(!selectedSubcategory.is_pieceable &&
            productData.size && { size: productData.size }),
          ...(selectedSubcategory.is_pieceable &&
            productData.quantity && { quantity: productData.quantity }),
        }),
      };

      const response = await fetch(`${API_BASE_URL}/api/v1/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product");
      }

      await response.json();
      toast.success("Product created successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
      const message =
        error instanceof Error ? error.message : "Failed to create product";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setProductData({
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      subcategoryId: "",
      images: [],
      stock: 0,
      size: "",
      quantity: 1,
    });
    setSelectedSubcategory(null);
    setImageFile(null);
    setImagePreview("");
    setError(null);
  };

  // Get filtered subcategories based on selected category
  const filteredSubcategories = productData.categoryId
    ? subcategories.filter((sub) => sub.category_id === productData.categoryId)
    : [];

  // Get available sizes for weight-based products
  const availableSizes = selectedSubcategory?.kilo_to_price_map
    ? Object.keys(selectedSubcategory.kilo_to_price_map)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
          <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
          <p className="text-sm text-gray-600 mb-6">
            Fill in the details to add a new product to your shop
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

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
              value={productData.categoryId}
              onChange={(e) => handleInputChange("categoryId", e.target.value)}
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
              value={productData.subcategoryId}
              onChange={(e) =>
                handleInputChange("subcategoryId", e.target.value)
              }
              className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
              disabled={
                !productData.categoryId || filteredSubcategories.length === 0
              }
              required
            >
              <option value="">
                {productData.categoryId && filteredSubcategories.length > 0
                  ? "Select subcategory"
                  : productData.categoryId
                  ? "No subcategories available"
                  : "Select a category first"}
              </option>
              {filteredSubcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}{" "}
                  {subcategory.is_pieceable ? "(Pieceable)" : "(Weight-based)"}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Information */}
          {selectedSubcategory && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">
                Subcategory Details
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-medium">
                    {selectedSubcategory.is_pieceable
                      ? "Pieceable"
                      : "Weight-based"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Upfront Payment:</span>
                  <span className="ml-2 font-medium">
                    ${selectedSubcategory.upfront_payment}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Base Price:</span>
                  <span className="ml-2 font-medium">
                    ${selectedSubcategory.price}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2 font-medium capitalize">
                    {selectedSubcategory.status}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Size Selection for Weight-based Products */}
          {selectedSubcategory &&
            !selectedSubcategory.is_pieceable &&
            availableSizes.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Select Size <span className="text-red-500">*</span>
                </label>
                <select
                  value={productData.size}
                  onChange={(e) => handleInputChange("size", e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
                  required
                >
                  <option value="">Select a size</option>
                  {availableSizes.map((size) => (
                    <option key={size} value={size}>
                      {size} - ${selectedSubcategory.kilo_to_price_map![size]}
                    </option>
                  ))}
                </select>
              </div>
            )}

          {/* Quantity for Pieceable Products */}
          {selectedSubcategory && selectedSubcategory.is_pieceable && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={productData.quantity}
                onChange={(e) =>
                  handleInputChange("quantity", parseInt(e.target.value))
                }
                className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                required
              />
            </div>
          )}

          {/* Price Display */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="w-full border rounded-lg px-4 py-2 text-sm bg-gray-50">
              ${productData.price.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {selectedSubcategory?.is_pieceable
                ? `Price per piece: $${selectedSubcategory.price}`
                : "Price is determined by selected size"}
            </p>
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              min="0"
              value={productData.stock}
              onChange={(e) =>
                handleInputChange("stock", parseInt(e.target.value))
              }
              placeholder="0"
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
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
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: JPG, PNG, WebP. Max size: 5MB
            </p>

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
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm hover:bg-primary/90 disabled:opacity-70"
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
