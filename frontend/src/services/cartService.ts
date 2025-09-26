import { apiClient } from '@/config/api';

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string | null;
    stock: number;
  };
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

class CartService {
  // Get user's cart
  async getCart(): Promise<Cart> {
    const response = await apiClient.get<{ status: string; data: Cart }>('/carts');
    return response.data;
  }

  // Add item to cart
  async addToCart(data: AddToCartRequest): Promise<Cart> {
    const response = await apiClient.post<{ status: string; data: Cart }>('/carts', data);
    return response.data;
  }

  // Update cart item quantity
  async updateCartItem(itemId: number, data: UpdateCartItemRequest): Promise<Cart> {
    const response = await apiClient.patch<{ status: string; data: Cart }>(`/carts/${itemId}`, data);
    return response.data;
  }

  // Remove item from cart
  async removeFromCart(itemId: number): Promise<Cart> {
    const response = await apiClient.delete<{ status: string; data: Cart }>(`/carts/${itemId}`);
    return response.data;
  }

  // Clear entire cart
  async clearCart(): Promise<Cart> {
    const response = await apiClient.delete<{ status: string; data: Cart }>('/carts');
    return response.data;
  }
}

export const cartService = new CartService();