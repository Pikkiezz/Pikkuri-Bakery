'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProduct } from './ProductContext';
import { useCategory } from './CategoryContext';

// Types
interface FilterState {
  selectedCategory: number | null;
  searchTerm: string;
  sortBy: 'name' | 'price' | 'newest';
  sortOrder: 'asc' | 'desc';
  priceRange: {
    min: number;
    max: number;
  };
}

interface FilterContextType {
  filters: FilterState;
  setSelectedCategory: (categoryId: number | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: 'name' | 'price' | 'newest') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setPriceRange: (range: { min: number; max: number }) => void;
  clearFilters: () => void;
}

// Initial state
const initialState: FilterState = {
  selectedCategory: null,
  searchTerm: '',
  sortBy: 'name',
  sortOrder: 'asc',
  priceRange: {
    min: 0,
    max: 1000
  }
};

// Create context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Provider component
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>(initialState);
  const { productsData } = useProduct();
  const { categories } = useCategory();
  const searchParams = useSearchParams();

  // Read search query from URL parameters
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setFilters(prev => ({ ...prev, searchTerm: searchQuery }));
    }
  }, [searchParams]);

  // Update price range based on actual product data
  useEffect(() => {
    if (productsData?.response && productsData.response.length > 0) {
      const prices = productsData.response.map(product => product.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      setFilters(prev => ({
        ...prev,
        priceRange: {
          min: minPrice,
          max: maxPrice
        }
      }));
    }
  }, [productsData]);

  const setSelectedCategory = (categoryId: number | null) => {
    setFilters(prev => ({ ...prev, selectedCategory: categoryId }));
  };

  const setSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, searchTerm: query }));
  };

  const setSortBy = (sortBy: 'name' | 'price' | 'newest') => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const setSortOrder = (order: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, sortOrder: order }));
  };

  const setPriceRange = (range: { min: number; max: number }) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const clearFilters = () => {
    setFilters(prev => ({
      ...prev,
      selectedCategory: null,
      searchTerm: '',
      sortBy: 'name',
      sortOrder: 'asc',
      priceRange: {
        min: productsData?.response ? Math.min(...productsData.response.map(p => p.price)) : 0,
        max: productsData?.response ? Math.max(...productsData.response.map(p => p.price)) : 1000
      }
    }));
  };

  return (
    <FilterContext.Provider value={{
      filters,
      setSelectedCategory,
      setSearchQuery,
      setSortBy,
      setSortOrder,
      setPriceRange,
      clearFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
