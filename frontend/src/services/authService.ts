import { apiClient, API_CONFIG } from '@/config/api';

export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  address?: string;
  password: string;
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

  // Check if user is authenticated (based on user data, not token)
  getToken(): string | null {
    // For HttpOnly cookies, we don't need to read the token
    // The browser will send it automatically with credentials: 'include'
    const user = this.getUser();
    return user ? 'authenticated' : null;
  }

  // Get stored refresh token (not needed for HttpOnly cookies)
  getRefreshToken(): string | null {
    return null; // Not needed for HttpOnly cookies
  }

  // Get stored user from localStorage (only user data, not token)
  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr || userStr === 'undefined' || userStr === 'null' || userStr === '') return null;
    try {
      const user = JSON.parse(userStr);
      return user;
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
    // Note: HttpOnly cookies are cleared by server on logout
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    // For HttpOnly cookies, we can't check token directly
    // So we rely on user data in localStorage
    // If user data exists, assume they're authenticated
    // The server will handle token validation
    return !!this.getUser();
  }

  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<{ status: string; message: string; token: string; data: User }>('/users/login', credentials);
      console.log('AuthService - login response:', response.data);
      const authData: AuthResponse = {
        user: response.data as unknown as User,
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
      // Call logout API to clear server-side session
      await apiClient.post('/users/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local auth data (cart will be cleared by CartContext)
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


}

export const authService = new AuthService();
