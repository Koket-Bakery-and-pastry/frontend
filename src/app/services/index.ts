/**
 * Services Index
 * Re-exports all services for convenient imports
 */

// API Client
export { apiClient, API_BASE_URL } from "./api";

// Auth (namespace to avoid conflicts)
export * as authService from "./authService";
export { loginUser, registerUser, refreshToken, logoutUser } from "./authService";

// User Profile
export {
  getProfile,
  updateProfileImage,
  type User,
  type UserRating,
  type UserStatsData,
} from "./userService";

// Products
export * from "./productService";

// Cart
export * from "./cartService";

// Orders (specific exports to avoid conflicts)
export {
  getUserOrders,
  getOrderById,
  createOrder,
  statusColors,
  statusLabels,
  type Order,
  type OrderStatus,
  type OrderItemDTO,
  type CreateOrderPayload,
} from "./orderService";

// Categories
export * from "./categoryService";

// Admin services (use specific imports for admin)
// import { getAllOrders } from "@/app/services/admin";
