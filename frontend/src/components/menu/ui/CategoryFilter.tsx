'use client';

interface Category {
  id: number;
  name: string;
  emoji: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategorySelect: (categoryId: number | null) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {/* All Categories Button */}
      <button
        onClick={() => onCategorySelect(null)}
        className={`px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 ${
          selectedCategory === null
            ? 'bg-gradient-to-r from-stone-600 to-amber-600 text-white shadow-lg'
            : 'bg-white/80 text-stone-700 hover:bg-stone-100 border-2 border-stone-300'
        }`}
      >
        🍽️ All Items
      </button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 ${
            selectedCategory === category.id
              ? 'bg-gradient-to-r from-stone-600 to-amber-600 text-white shadow-lg'
              : 'bg-white/80 text-stone-700 hover:bg-stone-100 border-2 border-stone-300'
          }`}
        >
          {category.emoji} {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
