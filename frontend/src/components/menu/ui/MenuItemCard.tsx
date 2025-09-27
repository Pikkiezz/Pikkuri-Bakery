'use client';


import { useCart } from '@/contexts/CartContext';



import type { ProductResponse } from '@/types';

interface MenuItemCardProps {
  item: ProductResponse;
  quantity: number;
  onQuantityChange?: (itemId: number, change: number) => void;
}

const MenuItemCard = ({ item, quantity, onQuantityChange }: MenuItemCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 border border-stone-200/50">
        {/* Product Image */}
        <div className="relative mb-6">
          <div className="w-full h-48 rounded-xl overflow-hidden shadow-lg">
            {item.imageUrl ? (
              <img 
                src={item.imageUrl} 
                alt={item.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-stone-200 to-amber-200 flex items-center justify-center">
                <span className="text-8xl animate-pulse">
                  {'🍽️'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-stone-800 mb-2 font-fredoka">
            {item.name}
          </h3>
          <p className="text-sm text-stone-600 mb-4 font-quicksand leading-relaxed">
            {item.description}
          </p>
          <h1 className="text-xl font-bold bg-gradient-to-r from-stone-600 to-amber-600 bg-clip-text text-transparent mb-4">
            {item.price} ฿
          </h1>


          {/* Quantity Selector */}
          {onQuantityChange && (
            <div className="flex items-center justify-center mb-6">
              <button 
                onClick={() => onQuantityChange(item.id, -1)}
                className="w-8 h-8 border-2 border-stone-300 rounded-full flex items-center justify-center hover:bg-stone-100 hover:border-stone-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity === 0}
              >
                -
              </button>
              <span className="mx-4 text-lg font-bold text-stone-700 min-w-[2rem] text-center">
                {quantity}
              </span>
              <button 
                onClick={() => onQuantityChange(item.id, 1)}
                className="w-8 h-8 border-2 border-stone-300 rounded-full flex items-center justify-center hover:bg-stone-100 hover:border-stone-400 transition-colors"
              >
                +
              </button>
            </div>
          )}

          {/* Add to Cart Button */}
          <button 
            className={`w-full font-bold py-3 px-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:-translate-y-1 ${
              onQuantityChange 
                ? (quantity > 0 
                    ? 'bg-gradient-to-r from-stone-600 to-amber-600 text-white' 
                    : 'bg-stone-200 text-stone-500 cursor-not-allowed')
                : 'bg-gradient-to-r from-stone-600 to-amber-600 text-white'
            }`}
            disabled={onQuantityChange && quantity === 0}

            onClick={() => {
              if (onQuantityChange) {
                onQuantityChange(item.id, -quantity);
              }
              addToCart(item.id, quantity, {
                name: item.name,
                price: item.price,
                image: item.imageUrl || ''
              });
            }}
          >
            {onQuantityChange 
              ? `🛒 Add to Cart - $${(item.price * quantity).toFixed(2)}`
              : '🛒 Add to Cart'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
