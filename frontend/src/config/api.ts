// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1',
  ENDPOINTS: {
    // Menu endpoints
    MENU: {
      CATEGORIES: '/menu/categories',
      ITEMS: '/menu/items',
      ITEM_BY_ID: (id: number) => `/menu/items/${id}`,
    },
    // Product endpoints
    PRODUCTS: {
      LIST: '/products',
      BY_ID: (id: number) => `/products/${id}`,
      BY_CATEGORY: (categoryId: number) => `/products/category/${categoryId}`,
    },
    // Cart endpoints
    CART: {
      GET: '/cart',
      ADD: '/cart/add',
      UPDATE: '/cart/update',
      REMOVE: '/cart/remove',
      CLEAR: '/cart/clear',
    },
    // Order endpoints
    ORDERS: {
      CREATE: '/orders',
      LIST: '/orders',
      BY_ID: (id: string) => `/orders/${id}`,
    },
    // Checkout endpoints
    CHECKOUT: {
      PROCESS: '/checkout/process',
    },
    // Profile endpoints
    PROFILE: {
      GET: '/profile',
      UPDATE: '/profile',
      AVATAR: '/profile/avatar',
    },
    // Auth endpoints
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
    },
    // User endpoints
    USERS: {
      PROFILE: '/users/profile',
      UPDATE: '/users/update',
    }
  }
};

// API Client with error handling
export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create API client instance
export const apiClient = new ApiClient();
