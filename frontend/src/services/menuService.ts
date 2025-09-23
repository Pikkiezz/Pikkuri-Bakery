import { apiClient, API_CONFIG } from '@/config/api';

// Types (should match your Prisma models)
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  emoji?: string;
  image?: string;
  category: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isDairyFree?: boolean;
  rating?: number;
  reviews?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuCategory {
  id: number;
  name: string;
  emoji: string;
  items: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuFilters {
  categoryId?: number;
  search?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isDairyFree?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface MenuResponse {
  categories: MenuCategory[];
  totalItems: number;
  hasMore: boolean;
}

// Menu Service
export class MenuService {
  // Get all menu categories with items
  async getMenuCategories(): Promise<MenuCategory[]> {
    try {
      const response = await apiClient.get<MenuCategory[]>(API_CONFIG.ENDPOINTS.MENU.CATEGORIES);
      return response;
    } catch (error) {
      console.error('Failed to fetch menu categories:', error);
      throw new Error('Failed to fetch menu categories');
    }
  }

  // Get menu items with filters
  async getMenuItems(filters?: MenuFilters): Promise<MenuResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value.toString());
          }
        });
      }

      const endpoint = `${API_CONFIG.ENDPOINTS.MENU.ITEMS}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await apiClient.get<MenuResponse>(endpoint);
      return response;
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
      throw new Error('Failed to fetch menu items');
    }
  }

  // Get single menu item by ID
  async getMenuItemById(id: number): Promise<MenuItem> {
    try {
      const response = await apiClient.get<MenuItem>(API_CONFIG.ENDPOINTS.MENU.ITEM_BY_ID(id));
      return response;
    } catch (error) {
      console.error(`Failed to fetch menu item ${id}:`, error);
      throw new Error(`Failed to fetch menu item ${id}`);
    }
  }

  // Search menu items
  async searchMenuItems(query: string, filters?: Omit<MenuFilters, 'search'>): Promise<MenuResponse> {
    try {
      const searchFilters: MenuFilters = {
        ...filters,
        search: query,
      };
      return this.getMenuItems(searchFilters);
    } catch (error) {
      console.error('Failed to search menu items:', error);
      throw new Error('Failed to search menu items');
    }
  }
}

// Create service instance
export const menuService = new MenuService();
