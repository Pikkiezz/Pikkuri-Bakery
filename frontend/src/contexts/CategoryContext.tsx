'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, API_CONFIG } from '@/config/api';

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refreshCategories: () => Promise<void>;
  getCategoryById: (id: number) => Category | undefined;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      console.log('Fetching categories from:', API_CONFIG.ENDPOINTS.PRODUCTS.CATEGORIES);
      const response = await apiClient.get<Category[]>(API_CONFIG.ENDPOINTS.PRODUCTS.CATEGORIES);
      console.log('Categories response:', response);
      console.log('Categories data:', response.data);
      // API response is directly an array, not wrapped in { data: [...] }
      setCategories(response.data || []);
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getCategoryById = (id: number) => {
    return categories.find(c => c.id === id);
  };

  return (
    <CategoryContext.Provider value={{ categories, loading, error, refreshCategories: fetchCategories, getCategoryById }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
