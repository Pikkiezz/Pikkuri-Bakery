'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import CheckoutModal from './CheckoutModal';

interface CartSummaryProps {
  subtotal?: number;
  onClearCart?: () => void;
}

const methodsShipping = {
  STANDARD: {
      name: "Standard Shipping",
      duration: 5,
      baseCost: 0
  },
  EXPRESS: {
      name: "Express Shipping", 
      duration: 3,
      baseCost: 50
  },
  OVERNIGHT: {
      name: "Overnight Shipping",
      duration: 1,
      baseCost: 100
  }
}

const CartSummary = ({ subtotal, onClearCart: propClearCart }: CartSummaryProps = {}) => {
  const { state, clearCart: contextClearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('STANDARD');
  // Use props if provided, otherwise use context
  const total = subtotal !== undefined ? subtotal : state.total;
  const clearCart = propClearCart || contextClearCart;

  const getShippingInfo = (shippingMethod: string) => {
    return methodsShipping[shippingMethod as keyof typeof methodsShipping];
  }

  const shippingInfo = getShippingInfo(shippingMethod);
  const totalAmount = total + shippingInfo.baseCost;

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  // Render order details
  const renderOrderDetails = () => (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between text-stone-600">
        <span>Subtotal ({state.itemCount} items)</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      
      <div className="space-y-2">
        <label className="block text-stone-600 font-medium">Shipping Method</label>
        <select
          value={shippingMethod}
          onChange={(e) => setShippingMethod(e.target.value)}
          className="w-full p-3 border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white text-stone-700 font-quicksand"
        >
          <option value="STANDARD">Standard ({shippingInfo.duration} days) - ${shippingInfo.baseCost}</option>
          <option value="EXPRESS">Express ({methodsShipping.EXPRESS.duration} days) - ${methodsShipping.EXPRESS.baseCost}</option>
          <option value="OVERNIGHT">Overnight ({methodsShipping.OVERNIGHT.duration} days) - ${methodsShipping.OVERNIGHT.baseCost}</option>
        </select>
      </div>
      
      <div className="flex justify-between text-stone-600">
        <span>Shipping Cost</span>
        <span>${shippingInfo.baseCost.toFixed(2)}</span>
      </div>
      
      
      <div className="border-t border-stone-300 pt-4">
        <div className="flex justify-between text-xl font-bold text-stone-700">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  // Render action buttons
  const renderActionButtons = () => (
    <div className="space-y-3">
      <button
        onClick={handleCheckout}
        className="w-full bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:-translate-y-1"
      >
        🛒 Proceed to Checkout
      </button>
      
      <Link
        href="/menu"
        className="block w-full bg-stone-200 text-stone-700 font-bold py-3 px-6 rounded-2xl text-center transition-all duration-300 hover:bg-stone-300 hover:scale-105"
      >
        🥐 Continue Shopping
      </Link>
      
      <button
        onClick={handleClearCart}
        className="w-full text-red-500 font-bold py-2 px-4 rounded-xl transition-all duration-300 hover:bg-red-50 hover:scale-105"
      >
        🗑️ Clear Cart
      </button>
    </div>
  );

  // Render security badge
  const renderSecurityBadge = () => (
    <div className="mt-6 pt-6 border-t border-stone-200">
      <div className="flex items-center justify-center space-x-2 text-stone-500 text-sm">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>Secure checkout</span>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-stone-200/50 sticky top-24">
        <h2 className="text-2xl font-bold text-stone-700 mb-6 font-fredoka">Order Summary</h2>
        {renderOrderDetails()}
        {renderActionButtons()}
        {renderSecurityBadge()}
      </div>
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};

export default CartSummary;
