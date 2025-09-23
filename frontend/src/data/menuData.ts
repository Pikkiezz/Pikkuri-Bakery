// Menu data types
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  emoji?: string;
  image?: string;
  category: string;
  // Filter properties
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isDairyFree?: boolean;
  rating?: number;
  reviews?: number;
}

export interface MenuCategory {
  id: number;
  name: string;
  emoji: string;
  items: MenuItem[];
}

// Menu categories data
export const menuCategories: MenuCategory[] = [
  {
    id: 1,
    name: 'Croissants & Pastries',
    emoji: '🥐',
    items: [
      { 
        id: 1,
        name: 'Classic Butter Croissant', 
        price: 4.50, 
        description: 'Flaky, buttery layers baked to perfection', 
        emoji: '🥐', 
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=300&fit=crop&crop=center',
        category: 'Croissants & Pastries',
        isVegetarian: true,
        isDairyFree: false,
        rating: 4.8,
        reviews: 124
      },
      { 
        id: 2,
        name: 'Chocolate Croissant', 
        price: 5.00, 
        description: 'Rich chocolate filling in our signature croissant', 
        emoji: '🍫', 
        image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop&crop=center',
        category: 'Croissants & Pastries',
        isVegetarian: true,
        isDairyFree: false,
        rating: 4.9,
        reviews: 98
      },
      { 
        id: 3,
        name: 'Almond Croissant', 
        price: 5.50, 
        description: 'Toasted almonds and sweet filling', 
        emoji: '🥜',
        category: 'Croissants & Pastries',
        isVegetarian: true,
        isDairyFree: false,
        rating: 4.7,
        reviews: 87
      },
      { 
        id: 4,
        name: 'Ham & Cheese Croissant', 
        price: 6.00, 
        description: 'Savory ham and melted cheese', 
        emoji: '🧀',
        category: 'Croissants & Pastries',
        isVegetarian: false,
        isDairyFree: false,
        rating: 4.6,
        reviews: 76
      },
    ]
  },
  {
    id: 2,
    name: 'Fresh Breads',
    emoji: '🥖',
    items: [
      { 
        id: 5,
        name: 'Sourdough Loaf', 
        price: 8.00, 
        description: 'Traditional sourdough with crispy crust', 
        emoji: '🍞', 
        image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop&crop=center',
        category: 'Fresh Breads',
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: false,
        isDairyFree: true,
        rating: 4.9,
        reviews: 156
      },
      { 
        id: 6,
        name: 'Whole Wheat Bread', 
        price: 7.50, 
        description: 'Healthy whole wheat with seeds', 
        emoji: '🌾',
        category: 'Fresh Breads',
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: false,
        isDairyFree: true,
        rating: 4.5,
        reviews: 89
      },
      { 
        id: 7,
        name: 'Baguette', 
        price: 3.50, 
        description: 'Classic French baguette, fresh daily', 
        emoji: '🥖', 
        image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&h=300&fit=crop&crop=center',
        category: 'Fresh Breads',
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: false,
        isDairyFree: true,
        rating: 4.7,
        reviews: 134
      },
      { 
        id: 8,
        name: 'Focaccia', 
        price: 6.50, 
        description: 'Italian herb focaccia with olive oil', 
        emoji: '🫓',
        category: 'Fresh Breads',
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: false,
        isDairyFree: true,
        rating: 4.8,
        reviews: 112
      },
    ]
  },
  {
    id: 3,
    name: 'Coffee & Beverages',
    emoji: '☕',
    items: [
      { 
        id: 9,
        name: 'Espresso', 
        price: 2.50, 
        description: 'Rich, bold espresso shot', 
        emoji: '☕',
        category: 'Coffee & Beverages',
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isDairyFree: true,
        rating: 4.6,
        reviews: 203
      },
      { 
        id: 10,
        name: 'Cappuccino', 
        price: 3.50, 
        description: 'Perfect balance of espresso, milk, and foam', 
        emoji: '☕',
        category: 'Coffee & Beverages',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isDairyFree: false,
        rating: 4.8,
        reviews: 187
      },
      { 
        id: 11,
        name: 'Latte', 
        price: 4.00, 
        description: 'Smooth espresso with steamed milk', 
        emoji: '☕',
        category: 'Coffee & Beverages',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isDairyFree: false,
        rating: 4.7,
        reviews: 165
      },
      { 
        id: 12,
        name: 'Americano', 
        price: 3.00, 
        description: 'Espresso with hot water', 
        emoji: '☕',
        category: 'Coffee & Beverages',
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isDairyFree: true,
        rating: 4.5,
        reviews: 142
      },
      { 
        id: 13,
        name: 'Hot Chocolate', 
        price: 3.50, 
        description: 'Rich, creamy hot chocolate', 
        emoji: '🍫',
        category: 'Coffee & Beverages',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isDairyFree: false,
        rating: 4.9,
        reviews: 98
      },
    ]
  },
  {
    id: 4,
    name: 'Cakes & Desserts',
    emoji: '🍰',
    items: [
      { 
        id: 14,
        name: 'Chocolate Cake Slice', 
        price: 4.50, 
        description: 'Rich chocolate cake with ganache', 
        emoji: '🍰',
        category: 'Cakes & Desserts',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isDairyFree: false,
        rating: 4.8,
        reviews: 145
      },
      { 
        id: 15,
        name: 'Cheesecake', 
        price: 5.00, 
        description: 'Creamy New York style cheesecake', 
        emoji: '🧀',
        category: 'Cakes & Desserts',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isDairyFree: false,
        rating: 4.9,
        reviews: 167
      },
      { 
        id: 16,
        name: 'Tiramisu', 
        price: 5.50, 
        description: 'Classic Italian tiramisu', 
        emoji: '🍰',
        category: 'Cakes & Desserts',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isDairyFree: false,
        rating: 4.7,
        reviews: 123
      },
      { 
        id: 17,
        name: 'Fruit Tart', 
        price: 4.00, 
        description: 'Fresh seasonal fruits on pastry cream', 
        emoji: '🥧',
        category: 'Cakes & Desserts',
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isDairyFree: false,
        rating: 4.6,
        reviews: 89
      },
    ]
  }
];

// Categories for filter buttons
export const categoriesForFilter = menuCategories.map(category => ({
  id: category.id,
  name: category.name,
  emoji: category.emoji
}));

// Get all menu items as a flat array
export const allMenuItems = menuCategories.flatMap(category => category.items);

// Filter functions
export const filterMenuItems = (items: MenuItem[], filters: any) => {
  return items.filter(item => {
    // Category filter
    if (filters.selectedCategory && item.category !== menuCategories.find(c => c.id === filters.selectedCategory)?.name) {
      return false;
    }

    // Search query
    if (filters.searchQuery && !item.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }

    // Price range
    if (item.price < filters.priceRange.min || item.price > filters.priceRange.max) {
      return false;
    }

    // Menu filters
    if (filters.menuFilters.showVegetarian && !item.isVegetarian) {
      return false;
    }
    if (filters.menuFilters.showVegan && !item.isVegan) {
      return false;
    }
    if (filters.menuFilters.showGlutenFree && !item.isGlutenFree) {
      return false;
    }
    if (filters.menuFilters.showDairyFree && !item.isDairyFree) {
      return false;
    }

    return true;
  });
};

// Sort functions
export const sortMenuItems = (items: MenuItem[], sortBy: string, sortOrder: string) => {
  return [...items].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'rating':
        aValue = a.rating || 0;
        bValue = b.rating || 0;
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });
};