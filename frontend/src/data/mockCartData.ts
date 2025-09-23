// Mock cart data for testing before API integration
export interface MockCartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  emoji?: string;
  category: string;
}

export interface MockCart {
  id: number;
  userId: number;
  items: MockCartItem[];
  createdAt: string;
  updatedAt: string;
}

// Sample mock cart data
export const mockCartData: MockCart = {
  id: 1,
  userId: 1,
  items: [
    {
      id: 1,
      productId: 1,
      name: "Croissant",
      price: 3.50,
      quantity: 2,
      emoji: "🥐",
      category: "Pastries"
    },
    {
      id: 2,
      productId: 5,
      name: "Chocolate Chip Cookie",
      price: 2.00,
      quantity: 3,
      emoji: "🍪",
      category: "Cookies"
    },
    {
      id: 3,
      productId: 8,
      name: "Cappuccino",
      price: 4.50,
      quantity: 1,
      emoji: "☕",
      category: "Beverages"
    }
  ],
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T14:45:00Z"
};

// Helper function to calculate totals
export const calculateCartTotals = (items: MockCartItem[]) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  return { total, itemCount };
};
