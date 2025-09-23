'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ProductCard } from './ui';

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: 'Buttery Croissants',
    price: 4.50,
    originalPrice: 5.50,
    image: '/api/placeholder/300/300',
    rating: 4.8,
    reviews: 124,
    badge: 'BESTSELLER',
    emoji: '🥐',
    description: 'Freshly baked buttery croissants with flaky layers',
    color: 'from-amber-200 to-orange-200',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 2,
    name: 'Artisan Coffee',
    price: 3.50,
    originalPrice: 4.50,
    image: '/api/placeholder/300/300',
    rating: 4.6,
    reviews: 89,
    badge: 'HOT',
    emoji: '☕',
    description: 'Rich and aromatic coffee beans from local roasters',
    color: 'from-yellow-200 to-amber-200',
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    id: 3,
    name: 'Chocolate Cupcakes',
    price: 3.00,
    originalPrice: 3.50,
    image: '/api/placeholder/300/300',
    rating: 4.9,
    reviews: 203,
    badge: 'NEW',
    emoji: '🧁',
    description: 'Moist chocolate cupcakes with creamy frosting',
    color: 'from-orange-200 to-red-200',
    gradient: 'from-orange-500 to-red-500',
    isTopPick: true
  },
  {
    id: 4,
    name: 'Fresh Bread Loaf',
    price: 2.50,
    originalPrice: 3.00,
    image: '/api/placeholder/300/300',
    rating: 4.7,
    reviews: 156,
    badge: 'FRESH',
    emoji: '🥖',
    description: 'Daily baked artisan bread with crispy crust',
    color: 'from-amber-200 to-yellow-200',
    gradient: 'from-amber-500 to-yellow-500'
  }
];

const FeaturedProducts = () => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const updateQuantity = (productId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const getQuantity = (productId: number) => quantities[productId] || 0;

  return (
    <section className="py-20 bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-stone-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-stone-200/30 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-fredoka">
            <span className="bg-gradient-to-r from-stone-700 to-amber-600 bg-clip-text text-transparent">
              Fresh
            </span>
            <span className="bg-gradient-to-r from-amber-600 to-stone-600 bg-clip-text text-transparent">
              {' '}Bakery
            </span>
          </h2>
          <p className="text-xl text-stone-700 max-w-2xl mx-auto font-quicksand">
            Discover our freshly baked goods and artisanal coffee made with love! ☕
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={getQuantity(product.id)}
              onQuantityChange={updateQuantity}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-2"
          >
            🥐 Explore All Bakery Items
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
