import { apiClient } from "./api";

// REGISTER user
interface RegisterUserPayload {
  name?: string;
  email: string;
  password: string;
  [key: string]: any;
}

interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  [key: string]: any;
}

interface User {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface RegisterResponse {
  user: User;
  tokens: AuthTokens;
  [key: string]: any;
}

export const registerUser = async (
  userData: RegisterUserPayload
): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      userData
    );
    return response.data; // contains user + tokens
  } catch (error: any) {
    // handle errors clearly
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};
