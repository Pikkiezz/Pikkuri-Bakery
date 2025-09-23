'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Types
interface FilterState {
  selectedCategory: number | null;
  searchQuery: string;
  sortBy: 'name' | 'price' | 'rating';
  sortOrder: 'asc' | 'desc';
  priceRange: {
    min: number;
    max: number;
  };
  // Menu specific filters
  menuFilters: {
    showVegetarian: boolean;
    showVegan: boolean;
    showGlutenFree: boolean;
    showDairyFree: boolean;
  };
}

interface FilterContextType {
  filters: FilterState;
  setSelectedCategory: (categoryId: number | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: 'name' | 'price' | 'rating') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setPriceRange: (range: { min: number; max: number }) => void;
  setMenuFilter: (filter: keyof FilterState['menuFilters'], value: boolean) => void;
  clearFilters: () => void;
  clearMenuFilters: () => void;
}

// Initial state
const initialState: FilterState = {
  selectedCategory: null,
  searchQuery: '',
  sortBy: 'name',
  sortOrder: 'asc',
  priceRange: {
    min: 0,
    max: 100
  },
  menuFilters: {
    showVegetarian: false,
    showVegan: false,
    showGlutenFree: false,
    showDairyFree: false
  }
};

// Create context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Provider component
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const setSelectedCategory = (categoryId: number | null) => {
    setFilters(prev => ({ ...prev, selectedCategory: categoryId }));
  };

  const setSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const setSortBy = (sortBy: 'name' | 'price' | 'rating') => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const setSortOrder = (order: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, sortOrder: order }));
  };

  const setPriceRange = (range: { min: number; max: number }) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const setMenuFilter = (filter: keyof FilterState['menuFilters'], value: boolean) => {
    setFilters(prev => ({
      ...prev,
      menuFilters: {
        ...prev.menuFilters,
        [filter]: value
      }
    }));
  };

  const clearFilters = () => {
    setFilters(initialState);
  };

  const clearMenuFilters = () => {
    setFilters(prev => ({
      ...prev,
      menuFilters: {
        showVegetarian: false,
        showVegan: false,
        showGlutenFree: false,
        showDairyFree: false
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
      setMenuFilter,
      clearFilters,
      clearMenuFilters
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
