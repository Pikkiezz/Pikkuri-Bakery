'use client';

import { useCart } from '@/contexts/CartContext';
import { CartItem, CartSummary, EmptyCart } from './';

const CartContent = () => {
  const { state, isLoading, error, updateQuantity, removeFromCart, clearCart } = useCart();

  // Render loading state
  const renderLoadingState = () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-stone-700 mb-2 font-fredoka">Loading cart...</h2>
          <p className="text-stone-600 font-quicksand">Please wait while we fetch your items</p>
        </div>
      </div>
    </div>
  );

  // Render error state
  const renderErrorState = () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-stone-700 mb-2 font-fredoka">Error loading cart</h2>
          <p className="text-stone-600 font-quicksand">{error}</p>
        </div>
      </div>
    </div>
  );

  // Render page header
  const renderPageHeader = () => (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 font-fredoka">
        <span className="bg-gradient-to-r from-stone-700 to-amber-600 bg-clip-text text-transparent">
          Your
        </span>
        <span className="bg-gradient-to-r from-amber-600 to-stone-600 bg-clip-text text-transparent">
          {' '}Cart
        </span>
      </h1>
      <p className="text-xl text-stone-700 font-quicksand">
        {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
      </p>
    </div>
  );

  // Render cart items section
  const renderCartItems = () => (
    <div className="lg:col-span-2">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-stone-200/50">
        <h2 className="text-2xl font-bold text-stone-700 mb-6 font-fredoka">Cart Items</h2>
        <div className="space-y-4">
          {state.items.map((item) => (
            <CartItem 
              key={item.id} 
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Render cart summary section
  const renderCartSummary = () => (
    <div className="lg:col-span-1">
      <CartSummary 
        subtotal={state.total}
        onClearCart={clearCart}
      />
    </div>
  );

  // Render main cart content
  const renderMainContent = () => (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderPageHeader()}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {renderCartItems()}
          {renderCartSummary()}
        </div>
      </div>
    </div>
  );

  // Early returns for different states
  if (isLoading) return renderLoadingState();
  if (error) return renderErrorState();
  if (state.items.length === 0) return <EmptyCart />;

  return renderMainContent();
};

export default CartContent;
