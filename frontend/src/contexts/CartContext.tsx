'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartService, CartItem as ApiCartItem } from '@/services/cartService';

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
  addToCart: (productId: number, quantity?: number, productData?: { name: string; price: number; image?: string }) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
}

// Helper function to convert API cart item to local cart item
const convertApiCartItem = (apiItem: ApiCartItem): CartItem => ({
  id: apiItem.id,
  name: apiItem.product.name,
  price: apiItem.product.price,
  quantity: apiItem.quantity,
  image: apiItem.product.imageUrl || undefined,
  emoji: '🍽️', // Default emoji
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

  // Load cart from API on mount (only when component is used)
  useEffect(() => {
    refreshCart();
  }, []);


  // Refresh cart from API
  const refreshCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const cart = await cartService.getCart();
      const items = cart.items.map(convertApiCartItem);
      const { total, itemCount } = calculateTotals(items);
      
      setState({ items, total, itemCount });
    } catch (err) {
      console.error('Failed to refresh cart:', err);
      
      // Check if it's an authentication error
      if (err instanceof Error && err.message.includes('Invalid token')) {
        // Clear auth data (don't redirect to avoid infinite loop)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user_data');
        }
      }
      
      setError(err instanceof Error ? err.message : 'Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId: number, quantity: number = 1, productData?: { name: string; price: number; image?: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const request = {
        productId: productId,
        quantity: quantity
      };
      
      await cartService.addToCart(request);
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
      
      await cartService.removeFromCart(id);
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
        await cartService.removeFromCart(id);
      } else {
        await cartService.updateCartItem(id, { quantity });
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
      
      await cartService.clearCart();
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