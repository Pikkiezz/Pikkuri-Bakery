'use client';

import { useState } from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { MenuItemCard, CategoryHeader, CategoryFilter, MenuSort } from './ui';
import { menuCategories, categoriesForFilter, filterMenuItems, sortMenuItems } from '@/data/menuData';

const MenuCategories = () => {
  const { filters, setSelectedCategory } = useFilter();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  // Filter categories based on selection
  const filteredCategories = filters.selectedCategory 
    ? menuCategories.filter(category => category.id === filters.selectedCategory)
    : menuCategories;

  // Process each category's items with filters and sorting
  const processedCategories = filteredCategories.map(category => ({
    ...category,
    items: sortMenuItems(
      filterMenuItems(category.items, filters),
      filters.sortBy,
      filters.sortOrder
    )
  }));

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

  // Render category items
  const renderCategoryItems = (category: typeof processedCategories[0]) => (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //   {category.items.map((item, index) => (
    //     <ProductCard
    //       key={item.id}
    //       product={item}
    //       index={index}
    //       quantity={getItemQuantity(item.id)}
    //       onQuantityChange={handleQuantityUpdate}
    //     />
    //   ))}
    // </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {category.items.map((item, index) => (
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

  // Render processed categories
  const renderProcessedCategories = () => (
    <>
      {processedCategories.map((category) => (
        <div key={category.id} className="mb-16">
          {/* Category Header */}
          <CategoryHeader
            name={category.name}
            emoji={category.emoji}
          />

          {renderCategoryItems(category)}
          {category.items.length === 0 && renderNoItemsMessage()}
        </div>
      ))}
    </>
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

        {/* Processed Categories */}
        {renderProcessedCategories()}
      </div>
    </section>
  );
};

export default MenuCategories;