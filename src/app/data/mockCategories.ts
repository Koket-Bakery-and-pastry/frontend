import { Category } from "../types/category";

export const initialCategories: Category[] = [
  {
    id: "1",
    name: "Cakes",
    subcategories: [
      {
        id: "1-1",
        name: "Moca cakes",
        parentCategory: "1",
        createdAt: "2024-01-01",
      },
      {
        id: "1-2",
        name: "Black forest cakes",
        parentCategory: "1",
        createdAt: "2024-01-01",
      },
      {
        id: "1-3",
        name: "Cup cakes",
        parentCategory: "1",
        createdAt: "2024-01-01",
      },
    ],
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Quick Bread",
    subcategories: [],
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    name: "Cookies",
    subcategories: [],
    createdAt: "2024-01-01",
  },
  {
    id: "4",
    name: "Fondant",
    subcategories: [],
    createdAt: "2024-01-01",
  },
];
