'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockCartService, MockCartItem, AddToCartRequest } from '@/services/mockCartService';

// Types
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  emoji?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface CartContextType {
  state: CartState;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
}

// Helper function to convert mock cart item to local cart item
const convertMockCartItem = (mockItem: MockCartItem): CartItem => ({
  id: mockItem.id,
  name: mockItem.name,
  price: mockItem.price,
  quantity: mockItem.quantity,
  image: mockItem.image,
  emoji: mockItem.emoji,
});

// Calculate totals
const calculateTotals = (items: CartItem[]): { total: number; itemCount: number } => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CartState>({
    items: [],
    total: 0,
    itemCount: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load cart from API on mount
  useEffect(() => {
    refreshCart();
  }, []);

  // Refresh cart from mock service
  const refreshCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const cart = await mockCartService.getCart();
      const items = cart.items.map(convertMockCartItem);
      const { total, itemCount } = calculateTotals(items);
      
      setState({ items, total, itemCount });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart');
      console.error('Failed to refresh cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const request: AddToCartRequest = {
        productId: item.id,
        quantity: item.quantity || 1, // ใช้ quantity ที่ส่งมา หรือ default = 1
        name: item.name,
        price: item.price,
        image: item.image,
        emoji: item.emoji,
        category: 'General' // Default category, can be improved later
      };
      
      await mockCartService.addToCart(request);
      await refreshCart(); // Refresh cart after adding
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
      console.error('Failed to add to cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await mockCartService.removeFromCart(id);
      await refreshCart(); // Refresh cart after removing
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item from cart');
      console.error('Failed to remove from cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (id: number, quantity: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (quantity <= 0) {
        await mockCartService.removeFromCart(id);
      } else {
        await mockCartService.updateCartItem({ itemId: id, quantity });
      }
      
      await refreshCart(); // Refresh cart after updating
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item quantity');
      console.error('Failed to update quantity:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await mockCartService.clearCart();
      await refreshCart(); // Refresh cart after clearing
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      console.error('Failed to clear cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoading,
      error,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};