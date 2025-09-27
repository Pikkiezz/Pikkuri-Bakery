'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, API_CONFIG } from '@/config/api';
import type { ProductsResponse, ProductResponse } from '@/types';

interface ProductContextType {
  productsData: ProductsResponse | null;
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  getProductById: (id: number) => ProductResponse | undefined;
  getProductsByCategory: (categoryId: number) => ProductResponse[];
  searchProducts: (query: string) => ProductResponse[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [productsData, setProductsData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get<ProductsResponse>(API_CONFIG.ENDPOINTS.PRODUCTS.LIST);
      setProductsData(response.data!);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  const getProductById = (id: number): ProductResponse | undefined => {
    if (!productsData) return undefined;
    return productsData.response.find(product => product.id === id);
  };

  const getProductsByCategory = (categoryId: number): ProductResponse[] => {
    if (!productsData) return [];
    return productsData.response.filter(product => product.categoryId === categoryId);
  };

  const searchProducts = (query: string): ProductResponse[] => {
    if (!productsData) return [];
    const lowercaseQuery = query.toLowerCase();
    return productsData.response.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      (product.description && product.description.toLowerCase().includes(lowercaseQuery))
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value: ProductContextType = {
    productsData,
    loading,
    error,
    refreshProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
