'use client';

import { useFilter } from '@/contexts/FilterContext';

const MenuSort = () => {
  const { filters, setSortBy, setSortOrder } = useFilter();

  // Handle sort by change
  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name' | 'price' | 'rating');
  };

  // Handle sort order change
  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-4">
        {/* Sort By */}
        <div className="flex items-center gap-2">
          <span className="text-stone-700 font-bold font-quicksand">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={handleSortByChange}
            className="px-4 py-2 border-2 border-stone-300 rounded-full focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white/80 backdrop-blur-sm text-stone-700 font-quicksand shadow-lg"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex items-center gap-2">
          <span className="text-stone-700 font-bold font-quicksand">Order:</span>
          <select
            value={filters.sortOrder}
            onChange={handleSortOrderChange}
            className="px-4 py-2 border-2 border-stone-300 rounded-full focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white/80 backdrop-blur-sm text-stone-700 font-quicksand shadow-lg"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MenuSort;
