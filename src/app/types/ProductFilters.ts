export type Category =
  | "All Products"
  | "Cake"
  | "Quick Bread"
  | "Cookies"
  | "Fondant Cake";

export type ProductFilters = {
  category: Category;
  subcategory: string;
  search: string;
  sort: string;
};
