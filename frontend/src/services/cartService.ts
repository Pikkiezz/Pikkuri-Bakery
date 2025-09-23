import { apiClient, API_CONFIG } from '@/config/api';

// Types (should match your Prisma models)
export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
    emoji?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: number;
  userId?: number;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  itemId: number;
  quantity: number;
}

// Cart Service
export class CartService {
  // Get current cart
  async getCart(): Promise<Cart> {
    try {
      const response = await apiClient.get<Cart>(API_CONFIG.ENDPOINTS.CART.GET);
      return response;
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      throw new Error('Failed to fetch cart');
    }
  }

  // Add item to cart
  async addToCart(data: AddToCartRequest): Promise<Cart> {
    try {
      const response = await apiClient.post<Cart>(API_CONFIG.ENDPOINTS.CART.ADD, data);
      return response;
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw new Error('Failed to add item to cart');
    }
  }

  // Update cart item quantity
  async updateCartItem(data: UpdateCartItemRequest): Promise<Cart> {
    try {
      const response = await apiClient.put<Cart>(API_CONFIG.ENDPOINTS.CART.UPDATE, data);
      return response;
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw new Error('Failed to update cart item');
    }
  }

  // Remove item from cart
  async removeFromCart(itemId: number): Promise<Cart> {
    try {
      const response = await apiClient.delete<Cart>(`${API_CONFIG.ENDPOINTS.CART.REMOVE}/${itemId}`);
      return response;
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      throw new Error('Failed to remove item from cart');
    }
  }

  // Clear entire cart
  async clearCart(): Promise<Cart> {
    try {
      const response = await apiClient.delete<Cart>(API_CONFIG.ENDPOINTS.CART.CLEAR);
      return response;
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw new Error('Failed to clear cart');
    }
  }
}

// Create service instance
export const cartService = new CartService();
