export type Category = {
  id: string;
  name: string;
  subcategories: SubCategory[];
  createdAt: string;
};

export type SubCategory = {
  id: string;
  name: string;
  parentCategory: string;
  createdAt: string;
};
