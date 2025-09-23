import Link from 'next/link';
import { CategoryCard } from './ui';

// Mock data for categories
const categories = [
  {
    id: 1,
    name: 'Croissants & Pastries',
    description: 'Buttery croissants and flaky pastries',
    image: '/api/placeholder/400/300',
    productCount: 12,
    color: 'from-amber-200 to-orange-200',
    gradient: 'from-amber-500 to-orange-500',
    emoji: '🥐',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50'
  },
  {
    id: 2,
    name: 'Fresh Breads',
    description: 'Daily baked artisan breads',
    image: '/api/placeholder/400/300',
    productCount: 8,
    color: 'from-yellow-200 to-amber-200',
    gradient: 'from-yellow-500 to-amber-500',
    emoji: '🥖',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-50'
  },
  {
    id: 3,
    name: 'Coffee & Beverages',
    description: 'Rich coffee and refreshing drinks',
    image: '/api/placeholder/400/300',
    productCount: 6,
    color: 'from-orange-200 to-red-200',
    gradient: 'from-orange-500 to-red-500',
    emoji: '☕',
    bgColor: 'bg-gradient-to-br from-orange-50 to-red-50'
  },
  {
    id: 4,
    name: 'Cakes & Desserts',
    description: 'Sweet cakes and delicious desserts',
    image: '/api/placeholder/400/300',
    productCount: 10,
    color: 'from-amber-200 to-yellow-200',
    gradient: 'from-amber-500 to-yellow-500',
    emoji: '🍰',
    bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50'
  }
];

const Categories = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-stone-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-amber-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-stone-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-fredoka">
            <span className="bg-gradient-to-r from-stone-700 to-amber-600 bg-clip-text text-transparent">
              Bakery
            </span>
            <span className="bg-gradient-to-r from-amber-600 to-stone-600 bg-clip-text text-transparent">
              {' '}Categories
            </span>
          </h2>
          <p className="text-xl text-stone-700 max-w-2xl mx-auto font-quicksand">
            Explore our delicious categories of fresh baked goods and artisanal coffee! ☕
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-2"
          >
            🥐 Explore All Categories
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
