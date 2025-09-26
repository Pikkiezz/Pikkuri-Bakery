import { apiClient, API_CONFIG } from '@/config/api';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string | undefined;
  username: string | undefined;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export class AuthService {
  private userKey = 'user_data';

  // Get stored token from cookie
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('userToken='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }

  // Get stored refresh token from cookie
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    const cookies = document.cookie.split(';');
    const refreshTokenCookie = cookies.find(cookie => cookie.trim().startsWith('refreshToken='));
    return refreshTokenCookie ? refreshTokenCookie.split('=')[1] : null;
  }

  // Get stored user from localStorage (only user data, not token)
  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr || userStr === 'undefined' || userStr === 'null') return null;
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Store auth data (token is stored in cookie by server)
  private storeAuthData(authData: AuthResponse): void {
    if (typeof window === 'undefined') return;
    // Only store user data in localStorage, token is in cookie
    localStorage.setItem(this.userKey, JSON.stringify(authData.user));
  }

  // Clear auth data
  clearAuthData(): void {
    if (typeof window === 'undefined') return;
    // Clear user data from localStorage
    localStorage.removeItem(this.userKey);
    // Clear cookies by setting them to expire
    document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<{ status: string; message: string; token: string; data: User }>('/users/login', credentials);
      const authData: AuthResponse = {
        user: response.data?.data as User,
        token: response.data?.token as string,
        refreshToken: response.data?.token as string // Use same token as refresh for now
      };
      this.storeAuthData(authData);
      return authData;
    } catch (error: any) {
      console.error('Login failed:', error);
      // Extract server error message if available
      const serverMessage = error?.response?.data?.message || error?.message;
      throw new Error(serverMessage || 'Login failed. Please check your credentials.');
    }
  }

  // Register
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<{ status: string; message: string; data: User }>('/users/signup', userData);
      // After successful signup, user needs to login to get token
      const authData: AuthResponse = {
        user: response.data?.data as User,
        token: '', // No token on signup
        refreshToken: ''
      };
      // Don't store auth data on signup, user needs to login
      return authData;
    } catch (error: any) {
      console.error('Registration failed:', error);
      // Extract server error message if available
      const serverMessage = error?.response?.data?.message || error?.message;
      throw new Error(serverMessage || 'Registration failed. Please try again.');
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        // TODO: Implement logout API when backend is ready
        // await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, { refreshToken });
        console.log('Logout (mock implementation)');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
    }
  }

  // Refresh token
  async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // TODO: Implement refresh token API when backend is ready
      // const response = await apiClient.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REFRESH, { refreshToken });
      // this.storeAuthData(response);
      // return response;
      throw new Error('Refresh token not implemented yet');
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuthData();
      throw new Error('Session expired. Please login again.');
    }
  }

  // Verify token
  async verifyToken(): Promise<User> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('No token available');
      }

      const response = await apiClient.get<{ status: string; message: string; data: User }>('/users/verify');
      return response.data?.data as User;
    } catch (error) {
      console.error('Token verification failed:', error);
      this.clearAuthData();
      throw new Error('Invalid token. Please login again.');
    }
  }

}

export const authService = new AuthService();
