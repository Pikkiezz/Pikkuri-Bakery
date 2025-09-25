'use client';

import { useCart } from '@/contexts/CartContext';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number | null;
  reviews: number | null;
  badge: string;
  description: string;
  color: string;
  gradient: string;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: number, change: number) => void;
}

export const ProductCard = ({ product, quantity, onQuantityChange }: ProductCardProps) => {
  const { addToCart } = useCart();
  return (
    <div className="group relative">
      {/* Badge */}
      <div className="absolute top-4 -right-4 z-20">
        <span className={`px-3 py-1 text-m font-bold rounded-full bg-gradient-to-r ${product.gradient} text-white shadow-lg`}>
          {product.badge}
        </span>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 border border-stone-200/50">

          {/* Product Image */}
          <div className="relative mb-6">
            {product.image ? (
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-xl group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${product.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-6xl">🥐</span>
              </div>
            )}
          </div>

        {/* Product Info */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-stone-800 mb-2 font-fredoka">
            {product.name}
          </h3>
          <p className="text-sm text-stone-600 mb-4 font-quicksand">
            {product.description}
          </p>

      

          {/* Price */}
          <div className="flex items-center justify-center mb-6">
            <span className="text-2xl font-bold bg-gradient-to-r from-stone-600 to-amber-600 bg-clip-text text-transparent">
              {product.price} ฿
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-center mb-6">
            <button 
              onClick={() => onQuantityChange(product.id, -1)}
              className="w-8 h-8 border-2 border-stone-300 rounded-full flex items-center justify-center hover:bg-stone-100 hover:border-stone-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={quantity === 0}
            >
              -
            </button>
            <span className="mx-4 text-lg font-bold text-stone-700 min-w-[2rem] text-center">
              {quantity}
            </span>
            <button 
              onClick={() => onQuantityChange(product.id, 1)}
              className="w-8 h-8 border-2 border-stone-300 rounded-full flex items-center justify-center hover:bg-stone-100 hover:border-stone-400 transition-colors"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button 
            className={`w-full font-bold py-3 px-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:-translate-y-1 ${
              quantity > 0 
                ? 'bg-gradient-to-r from-stone-600 to-amber-600 text-white' 
                : 'bg-stone-200 text-stone-500 cursor-not-allowed'
            }`}
            disabled={quantity === 0}
            onClick={() => {
              onQuantityChange(product.id, -quantity);
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity // ← ส่ง quantity ที่เลือกไว้
              });
            }}
          >
            🛒 Add to Cart - ${(product.price * quantity).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
