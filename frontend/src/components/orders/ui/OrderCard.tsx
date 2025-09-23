'use client';

import { useState } from 'react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  emoji?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  trackingNumber: string | null;
}

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get status color and text
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'delivered':
        return { color: 'text-green-600 bg-green-100', text: 'Delivered', icon: '✅' };
      case 'processing':
        return { color: 'text-blue-600 bg-blue-100', text: 'Processing', icon: '⏳' };
      case 'shipped':
        return { color: 'text-purple-600 bg-purple-100', text: 'Shipped', icon: '🚚' };
      case 'cancelled':
        return { color: 'text-red-600 bg-red-100', text: 'Cancelled', icon: '❌' };
      default:
        return { color: 'text-gray-600 bg-gray-100', text: 'Unknown', icon: '❓' };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Render order header
  const renderOrderHeader = () => (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-bold text-stone-800 font-fredoka">
          Order #{order.id}
        </h3>
        <p className="text-stone-600 font-quicksand">
          {formatDate(order.date)}
        </p>
      </div>
      <div className="text-right">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${statusInfo.color}`}>
          <span className="mr-2">{statusInfo.icon}</span>
          {statusInfo.text}
        </div>
        <p className="text-2xl font-bold text-stone-700 mt-2 font-poppins">
          ${order.total.toFixed(2)}
        </p>
      </div>
    </div>
  );

  // Render order items
  const renderOrderItems = () => (
    <div className="space-y-3">
      {order.items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 p-3 bg-stone-50 rounded-xl">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md">
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
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-stone-700 font-poppins truncate">
              {item.name}
            </h4>
            <p className="text-stone-600 font-quicksand">
              Qty: {item.quantity} × ${item.price.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-stone-700 font-poppins">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  // Render order details
  const renderOrderDetails = () => (
    <div className="mt-6 pt-6 border-t border-stone-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-bold text-stone-700 mb-2 font-fredoka">Shipping Address</h4>
          <p className="text-stone-600 font-quicksand text-sm">
            {order.shippingAddress}
          </p>
        </div>
        {order.trackingNumber && (
          <div>
            <h4 className="text-sm font-bold text-stone-700 mb-2 font-fredoka">Tracking Number</h4>
            <p className="text-stone-600 font-quicksand text-sm font-mono">
              {order.trackingNumber}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Render action buttons
  const renderActionButtons = () => (
    <div className="mt-6 pt-6 border-t border-stone-200">
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-gradient-to-r from-stone-600 to-amber-600 text-white font-bold rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
          📦 Track Order
        </button>
        <button className="px-4 py-2 bg-stone-200 text-stone-700 font-bold rounded-lg text-sm transition-all duration-300 hover:bg-stone-300 hover:scale-105">
          🔄 Reorder
        </button>
        {order.status === 'delivered' && (
          <button className="px-4 py-2 bg-amber-200 text-amber-700 font-bold rounded-lg text-sm transition-all duration-300 hover:bg-amber-300 hover:scale-105">
            ⭐ Leave Review
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-stone-200/50">
      {renderOrderHeader()}
      
      {isExpanded && (
        <>
          {renderOrderItems()}
          {renderOrderDetails()}
          {renderActionButtons()}
        </>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mt-4 py-3 text-stone-600 font-bold rounded-xl transition-all duration-300 hover:bg-stone-100 hover:scale-105"
      >
        {isExpanded ? '🔼 Show Less' : '🔽 View Details'}
      </button>
    </div>
  );
};

export default OrderCard;
