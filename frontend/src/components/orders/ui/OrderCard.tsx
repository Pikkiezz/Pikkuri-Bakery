'use client';

import Image from 'next/image';

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product?: {
    id: number;
    name: string;
    imageUrl?: string;
  };
}

interface Order {
  id: number;
  createdAt: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  items: OrderItem[];
  shipping?: {
    address: string;
    trackingNumber?: string;
  };
}

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {

  // Get status color and text
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return { color: 'text-green-600 bg-green-100', text: 'Delivered', icon: '✅' };
      case 'PROCESSING':
        return { color: 'text-blue-600 bg-blue-100', text: 'Processing', icon: '⏳' };
      case 'SHIPPED':
        return { color: 'text-purple-600 bg-purple-100', text: 'Shipped', icon: '🚚' };
      case 'CANCELLED':
        return { color: 'text-red-600 bg-red-100', text: 'Cancelled', icon: '❌' };
      case 'CONFIRMED':
        return { color: 'text-yellow-600 bg-yellow-100', text: 'Confirmed', icon: '✅' };
      case 'PENDING':
        return { color: 'text-orange-600 bg-orange-100', text: 'Pending', icon: '⏳' };
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
          {formatDate(order.createdAt)}
        </p>
      </div>
      <div className="text-right">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${statusInfo.color}`}>
          <span className="mr-2">{statusInfo.icon}</span>
          {statusInfo.text}
        </div>
        <p className="text-2xl font-bold text-stone-700 mt-2 font-poppins">
          {order.total.toFixed(2)} ฿
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
              {item.product?.imageUrl ? (
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-stone-200 to-amber-200 flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-stone-700 font-poppins truncate">
              {item.product?.name || 'Unknown Product'}
            </h4>
            <p className="text-stone-600 font-quicksand">
              Qty: {item.quantity} × {item.price.toFixed(2)} ฿
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-stone-700 font-poppins">
              {(item.price * item.quantity).toFixed(2)} ฿
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
            {order.shipping?.address || 'No address provided'}
          </p>
        </div>
        {order.shipping?.trackingNumber && (
          <div>
            <h4 className="text-sm font-bold text-stone-700 mb-2 font-fredoka">Tracking Number</h4>
            <p className="text-stone-600 font-quicksand text-sm font-mono">
              {order.shipping.trackingNumber}
            </p>
          </div>
        )}
      </div>
    </div>
  );


  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-stone-200/50">
      {renderOrderHeader()}
      {renderOrderItems()}
      {renderOrderDetails()}
    </div>
  );
};

export default OrderCard;
