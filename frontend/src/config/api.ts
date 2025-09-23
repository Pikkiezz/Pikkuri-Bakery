// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1',
  ENDPOINTS: {
    // Product endpoints
    PRODUCTS: {
      LIST: '/products',
      BY_ID: (id: number) => `/products/${id}`,
      SEARCH: '/products/search',
      CREATE: '/products',
      UPDATE: (id: number) => `/products/${id}`,
      DELETE: (id: number) => `/products/${id}`,
    },
    // User endpoints
    USERS: {
      SIGNUP: '/users/signup',
      LOGIN: '/users/login',
      LIST: '/users',
      BY_ID: (id: number) => `/users/${id}`,
      UPDATE: (id: number) => `/users/${id}`,
      DELETE: (id: number) => `/users/${id}`,
    },
    // Admin endpoints
    ADMINS: {
      SIGNUP: '/admins/signup',
      LOGIN: '/admins/login',
      BY_ID: (id: number) => `/admins/${id}`,
      UPDATE: (id: number) => `/admins/${id}`,
      DELETE: (id: number) => `/admins/${id}`,
      CATEGORIES: {
        CREATE: '/admins/categories',
      }
    },
    // Cart endpoints
    CART: {
      GET: '/cart',
      ADD: '/cart',
      UPDATE: (id: number) => `/cart/${id}`,
      REMOVE: (id: number) => `/cart/${id}`,
      CLEAR: '/cart',
      TOTAL: '/cart/total',
      SELECT: '/cart/select',
      CHECKOUT_PREVIEW: '/cart/checkout/preview',
      CHECKOUT: '/cart/checkout',
    },
    // Wishlist endpoints
    WISHLIST: {
      ADD: '/cart/wishlist',
      GET: '/cart/wishlist',
    },
    // Order endpoints
    ORDERS: {
      USER_ORDERS: '/orders/user',
      USER_ORDER_BY_ID: (id: number) => `/orders/user/${id}`,
      CANCEL: '/orders/user/cancel',
      ADMIN_UPDATE_STATUS: (id: number) => `/orders/admin/${id}/status`,
    },
    // Review endpoints
    REVIEWS: {
      PRODUCT_REVIEWS: (productId: number) => `/reviews/product/${productId}`,
      MY_REVIEWS: '/reviews/my-reviews',
      CREATE: '/reviews',
      UPDATE: (id: number) => `/reviews/${id}`,
      DELETE: (id: number) => `/reviews/${id}`,
    },
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

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
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
