'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { checkoutService, CheckoutRequest } from '@/services/checkoutService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const router = useRouter();
  const { state, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [error, setError] = useState<string | null>(null);

  // Handle checkout submission
  const handleCheckout = async () => {
    if (!shippingAddress.trim()) {
      setError('Please enter your shipping address');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const checkoutData: CheckoutRequest = {
        items: state.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          emoji: item.emoji
        })),
        shippingAddress: shippingAddress.trim(),
        paymentMethod,
        total: state.total
      };

      const response = await checkoutService.processCheckout(checkoutData);
      
      // Clear cart after successful checkout
      await clearCart();
      
      // Close modal
      onClose();
      
      // Redirect to order history
      router.push(`/orders?orderId=${response.orderId}`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (!isProcessing) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Render modal overlay
  const renderModalOverlay = () => (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {renderModalContent()}
      </div>
    </div>
  );

  // Render modal content
  const renderModalContent = () => (
    <>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-stone-800 mb-2 font-fredoka">
          🛒 Checkout
        </h2>
        <p className="text-stone-600 font-quicksand">
          Complete your order
        </p>
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-stone-700 mb-3 font-fredoka">
          Order Summary
        </h3>
        <div className="space-y-2">
          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-stone-600">
                {item.name} × {item.quantity}
              </span>
              <span className="font-bold text-stone-700">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="border-t border-stone-200 pt-2">
            <div className="flex justify-between text-lg font-bold text-stone-800">
              <span>Total</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-stone-700 mb-2 font-fredoka">
          📍 Shipping Address
        </label>
        <textarea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Enter your full shipping address..."
          className="w-full p-3 border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white text-stone-700 placeholder-stone-500 font-quicksand resize-none"
          rows={3}
          disabled={isProcessing}
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-stone-700 mb-2 font-fredoka">
          💳 Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-3 border-2 border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-400 focus:border-stone-500 bg-white text-stone-700 font-quicksand"
          disabled={isProcessing}
        >
          <option value="credit_card">Credit Card</option>
          <option value="debit_card">Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank_transfer">Bank Transfer</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm font-quicksand">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleClose}
          disabled={isProcessing}
          className="flex-1 px-4 py-3 bg-stone-200 text-stone-700 font-bold rounded-xl transition-all duration-300 hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={handleCheckout}
          disabled={isProcessing || !shippingAddress.trim()}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Complete Order'
          )}
        </button>
      </div>
    </>
  );

  return renderModalOverlay();
};

export default CheckoutModal;
