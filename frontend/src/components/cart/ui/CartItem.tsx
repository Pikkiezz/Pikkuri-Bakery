'use client';

import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    emoji?: string;
  };
  onUpdateQuantity?: (id: number, quantity: number) => void;
  onRemoveItem?: (id: number) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) => {
  const { updateQuantity: contextUpdateQuantity, removeFromCart: contextRemoveFromCart } = useCart();
  
  // Use props if provided, otherwise use context
  const updateQuantity = onUpdateQuantity || contextUpdateQuantity;
  const removeFromCart = onRemoveItem || contextRemoveFromCart;

  // Handle quantity update
  const handleQuantityUpdate = (change: number) => {
    updateQuantity(item.id, item.quantity + change);
  };

  // Handle remove item
  const handleRemoveItem = () => {
    removeFromCart(item.id);
  };

  // Render product image
  const renderProductImage = () => (
    <div className="flex-shrink-0">
      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-stone-200 to-amber-200 flex items-center justify-center">
            <span className="text-2xl">{item.emoji || '🍽️'}</span>
          </div>
        )}
      </div>
    </div>
  );

  // Render product info
  const renderProductInfo = () => (
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-bold text-stone-700 font-poppins truncate">
        {item.name}
      </h3>
      <p className="text-stone-600 font-quicksand">
        ${item.price} each
      </p>
    </div>
  );

  // Render quantity controls
  const renderQuantityControls = () => (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleQuantityUpdate(-1)}
        className="w-8 h-8 border-2 border-stone-300 rounded-full flex items-center justify-center hover:bg-stone-200 hover:border-stone-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={item.quantity <= 1}
      >
        -
      </button>
      <span className="w-8 text-center font-bold text-stone-700">
        {item.quantity}
      </span>
      <button
        onClick={() => handleQuantityUpdate(1)}
        className="w-8 h-8 border-2 border-stone-300 rounded-full flex items-center justify-center hover:bg-stone-200 hover:border-stone-400 transition-colors"
      >
        +
      </button>
    </div>
  );

  // Render price
  const renderPrice = () => (
    <div className="text-right">
      <p className="text-lg font-bold text-stone-700 font-poppins">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );

  // Render remove button
  const renderRemoveButton = () => (
    <button
      onClick={handleRemoveItem}
      className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300"
      title="Remove item"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );

  return (
    <div className="flex items-center space-x-4 p-4 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-colors duration-300">
      {renderProductImage()}
      {renderProductInfo()}
      {renderQuantityControls()}
      {renderPrice()}
      {renderRemoveButton()}
    </div>
  );
};

export default CartItem;
