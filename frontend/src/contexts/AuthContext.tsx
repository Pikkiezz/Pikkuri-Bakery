'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, LoginRequest, RegisterRequest } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  // Initialize authentication
  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if user is already logged in
      if (authService.isAuthenticated()) {
        const storedUser = authService.getUser();
        if (storedUser) {
          setUser(storedUser);
        } else {
          // Verify token with server
          const verifiedUser = await authService.verifyToken();
          setUser(verifiedUser);
        }
      }
    } catch (err) {
      console.error('Auth initialization failed:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
      // Clear invalid auth data
      authService.clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const authData = await authService.login(credentials);
      setUser(authData.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err; // Re-throw to handle in component
    } finally {
      setIsLoading(false);
    }
  };

  // Register
  const register = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const authData = await authService.register(userData);
      setUser(authData.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err; // Re-throw to handle in component
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      // Clear local state even if server logout fails
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
