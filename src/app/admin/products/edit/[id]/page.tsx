"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Subcat = { id: string; name: string };
type Category = {
  id: string;
  name: string;
  subcategories?: Subcat[];
};
type Product = {
  id: string | number;
  name: string;
  description: string;
  price: string;
  category: string;
  subCategory?: string | null;
  image?: string;
  featured: boolean;
  inStock: boolean;
};

export default function EditProductPage() {
  const products = [
    {
      id: 14,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img1.png",
      featured: true,
      inStock: true,
    },
    {
      id: 15,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img2.png",
      featured: true,
      inStock: true,
    },
    {
      id: 16,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img3.png",
      featured: true,
      inStock: true,
    },
    {
      id: 17,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img4.png",
      featured: true,
      inStock: true,
    },
    {
      id: 18,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img5.png",
      featured: true,
      inStock: true,
    },
    {
      id: 14,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img6.png",
      featured: true,
      inStock: true,
    },
    {
      id: 15,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img7.png",
      featured: true,
      inStock: true,
    },
    {
      id: 16,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img8.png",
      featured: true,
      inStock: true,
    },
    {
      id: 14,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img1.png",
      featured: true,
      inStock: true,
    },
    {
      id: 15,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img2.png",
      featured: true,
      inStock: true,
    },
    {
      id: 16,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img3.png",
      featured: true,
      inStock: true,
    },
    {
      id: 17,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img4.png",
      featured: true,
      inStock: true,
    },
    {
      id: 18,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img5.png",
      featured: true,
      inStock: true,
    },
    {
      id: 14,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img6.png",
      featured: true,
      inStock: true,
    },
    {
      id: 15,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img7.png",
      featured: true,
      inStock: true,
    },
    {
      id: 16,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img8.png",
      featured: true,
      inStock: true,
    },
    {
      id: 14,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img1.png",
      featured: true,
      inStock: true,
    },
    {
      id: 15,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img2.png",
      featured: true,
      inStock: true,
    },
    {
      id: 16,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img3.png",
      featured: true,
      inStock: true,
    },
    {
      id: 17,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img4.png",
      featured: true,
      inStock: true,
    },
    {
      id: 18,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img5.png",
      featured: true,
      inStock: true,
    },
    {
      id: 14,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img6.png",
      featured: true,
      inStock: true,
    },
    {
      id: 15,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img7.png",
      featured: true,
      inStock: true,
    },
    {
      id: 16,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: "450",
      category: "cakes",
      subCategory: "chocolate",
      image: "/assets/img8.png",
      featured: true,
      inStock: true,
    },
  ];
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(
    products.find((p) => p.id === Number(id)) || null
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const categories: Category[] = [
    {
      id: "cakes",
      name: "Cakes",
      subcategories: [
        { id: "blackforest", name: "Black Forest" },
        { id: "chocolate", name: "Chocolate Cake" },
        { id: "vanilla", name: "Vanilla Cake" },
      ],
    },
    {
      id: "cookies",
      name: "Cookies",
      subcategories: [
        { id: "choc_chip", name: "Chocolate Chip" },
        { id: "oatmeal", name: "Oatmeal Raisin" },
      ],
    },
  ];

  // Simulate fetching product data by id
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      // TODO: replace this mock fetch with an actual API call
      await new Promise((r) => setTimeout(r, 400));

      setProduct(product);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  const handleChange = (field: keyof Product, value: any) => {
    if (product) setProduct({ ...product, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSubmitting(true);

    // Simulate API PUT call
    await new Promise((r) => setTimeout(r, 600));
    console.log("Updated product:", product);
    alert(`Product "${product.name}" updated!`);
    setSubmitting(false);
  };

  if (loading || !product)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading product details...
      </div>
    );

  const selectedCategory = categories.find((c) => c.id === product.category);

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
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={product.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              value={product.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={product.category}
              onChange={(e) => handleChange("category", e.target.value)}
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

          {/* Subcategory */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Subcategory
            </label>
            <select
              value={product.subCategory || ""}
              onChange={(e) => handleChange("subCategory", e.target.value)}
              disabled={!selectedCategory?.subcategories?.length}
              className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
            >
              <option value="">
                {selectedCategory?.subcategories?.length
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

          {/* Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Image</label>
            <div className="flex items-center gap-3">
              {product.image && (
                <img
                  src={product.image}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const preview = URL.createObjectURL(file);
                    handleChange("image", preview);
                  }
                }}
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Featured Product
              </label>
              <select
                value={product.featured ? "Yes" : "No"}
                onChange={(e) =>
                  handleChange("featured", e.target.value === "Yes")
                }
                className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">In Stock</label>
              <select
                value={product.inStock ? "Yes" : "No"}
                onChange={(e) =>
                  handleChange("inStock", e.target.value === "Yes")
                }
                className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => history.back()}
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
