// Mock cart service using localStorage for persistence
import { MockCart, MockCartItem, mockCartData, calculateCartTotals } from '@/data/mockCartData';

// Re-export types for external use
export type { MockCartItem, MockCart } from '@/data/mockCartData';

const CART_STORAGE_KEY = 'pikkuri_cart';

export interface AddToCartRequest {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image?: string;
  emoji?: string;
  category: string;
}

export interface UpdateCartRequest {
  itemId: number;
  quantity: number;
}

class MockCartService {
  private getCartFromStorage(): MockCart {
    if (typeof window === 'undefined') {
      // Server-side rendering fallback
      return mockCartData;
    }
    
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        return mockCartData;
      }
    }
    return mockCartData;
  }

  private saveCartToStorage(cart: MockCart): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  private generateItemId(): number {
    return Date.now() + Math.random();
  }

  async getCart(): Promise<MockCart> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.getCartFromStorage();
  }

  async addToCart(data: AddToCartRequest): Promise<MockCart> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const cart = this.getCartFromStorage();
    const existingItem = cart.items.find(item => item.productId === data.productId);
    
    if (existingItem) {
      // Update existing item quantity
      existingItem.quantity += data.quantity;
    } else {
      // Add new item
      const newItem: MockCartItem = {
        id: this.generateItemId(),
        productId: data.productId,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        image: data.image,
        emoji: data.emoji,
        category: data.category
      };
      cart.items.push(newItem);
    }
    
    cart.updatedAt = new Date().toISOString();
    this.saveCartToStorage(cart);
    return cart;
  }

  async updateCartItem(data: UpdateCartRequest): Promise<MockCart> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const cart = this.getCartFromStorage();
    const item = cart.items.find(item => item.id === data.itemId);
    
    if (item) {
      if (data.quantity <= 0) {
        // Remove item if quantity is 0 or negative
        cart.items = cart.items.filter(item => item.id !== data.itemId);
      } else {
        item.quantity = data.quantity;
      }
      cart.updatedAt = new Date().toISOString();
      this.saveCartToStorage(cart);
    }
    
    return cart;
  }

  async removeCartItem(itemId: number): Promise<MockCart> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const cart = this.getCartFromStorage();
    cart.items = cart.items.filter(item => item.id !== itemId);
    cart.updatedAt = new Date().toISOString();
    this.saveCartToStorage(cart);
    
    return cart;
  }

  // Alias for compatibility with CartContext
  async removeFromCart(itemId: number): Promise<MockCart> {
    return this.removeCartItem(itemId);
  }

  async clearCart(): Promise<MockCart> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const cart = this.getCartFromStorage();
    cart.items = [];
    cart.updatedAt = new Date().toISOString();
    this.saveCartToStorage(cart);
    
    return cart;
  }
}

export const mockCartService = new MockCartService();
