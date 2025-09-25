'use client';

import { useState } from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { MenuItemCard, CategoryFilter, MenuSort } from './ui';
import { useProduct } from '@/contexts/ProductContext';
import { useCategory } from '@/contexts/CategoryContext';

import type { ProductResponse } from '@/types';


const MenuCategories = () => {
  const { filters, setSelectedCategory } = useFilter();
  const {productsData} = useProduct();
  const {categories} = useCategory();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  // Transform categories for filter
  console.log('Categories from useCategory:', categories);
  const categoriesForFilter = categories?.map(category => ({
    id: category.id,
    name: category.name
  })) || [];
  console.log('Categories for filter:', categoriesForFilter);

  // Get all items from all categories
  const allItems = productsData?.response || [];


  // Filter and sort all items
  const filteredAndSortedItems = allItems.filter(item => {
    // Category filter
    if (filters.selectedCategory && item.categoryId !== filters.selectedCategory) {
      return false;
    }
    // Search filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      return item.name.toLowerCase().includes(searchTerm) || 
             (item.description && item.description.toLowerCase().includes(searchTerm));
    }
    return true;
  }).sort((a, b) => {
    // Sort logic
    switch (filters.sortBy) {
      case 'name':
        return filters.sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      case 'price':
        return filters.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      case 'newest':
        return filters.sortOrder === 'asc' ? 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() :
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  // Handle quantity update
  const handleQuantityUpdate = (itemId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  // Get current quantity for item
  const getItemQuantity = (itemId: number) => quantities[itemId] || 0;

  // Handle category selection
  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  // Render all items
  const renderAllItems = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAndSortedItems.map((item, index) => (
        <MenuItemCard
          key={item.id}
          item={item}
          quantity={getItemQuantity(item.id)}
          onQuantityChange={handleQuantityUpdate}
        />
      ))}
    </div>
  );

  // Render no items message
  const renderNoItemsMessage = () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-bold text-stone-700 mb-2 font-fredoka">No items found</h3>
      <p className="text-stone-600 font-quicksand">Try adjusting your filters or search terms</p>
    </div>
  );

  // Render all items
  const renderAllItemsSection = () => (
    <div className="mb-16">
      {renderAllItems()}
      {filteredAndSortedItems.length === 0 && renderNoItemsMessage()}
    </div>
  );

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sort */}
        <MenuSort />

        {/* Category Filter */}
        <CategoryFilter
          categories={categoriesForFilter}
          selectedCategory={filters.selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        {/* All Items */}
        {renderAllItemsSection()}
      </div>
    </section>
  );
};

export default MenuCategories;