'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { OrderCard, OrderFilter, OrderSearch } from './ui';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 45.50,
    items: [
      { id: 1, name: 'Classic Croissant', price: 3.50, quantity: 2, image: '/images/croissant.png', emoji: '🥐' },
      { id: 2, name: 'Espresso', price: 2.00, quantity: 1, image: '/images/espresso.png', emoji: '☕' },
      { id: 3, name: 'Chocolate Chip Cookie', price: 2.50, quantity: 3, image: '/images/cookie.png', emoji: '🍪' }
    ],
    shippingAddress: '123 Main St, City, State 12345',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'processing',
    total: 28.75,
    items: [
      { id: 4, name: 'Blueberry Muffin', price: 4.25, quantity: 2, image: '/images/muffin.png', emoji: '🧁' },
      { id: 5, name: 'Cappuccino', price: 3.50, quantity: 1, image: '/images/cappuccino.png', emoji: '☕' }
    ],
    shippingAddress: '456 Oak Ave, City, State 12345',
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-003',
    date: '2024-01-05',
    status: 'cancelled',
    total: 15.00,
    items: [
      { id: 6, name: 'Bagel', price: 2.50, quantity: 2, image: '/images/bagel.png', emoji: '🥯' },
      { id: 7, name: 'Green Tea', price: 2.00, quantity: 1, image: '/images/tea.png', emoji: '🍵' }
    ],
    shippingAddress: '789 Pine St, City, State 12345',
    trackingNumber: null
  }
];

const OrderHistory = () => {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newOrderId, setNewOrderId] = useState<string | null>(null);

  // Check for new order ID from URL
  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      setNewOrderId(orderId);
      // Add new order to the list (simulate API response)
      const newOrder = {
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        status: 'processing' as const,
        total: 0, // Will be updated from cart
        items: [],
        shippingAddress: '',
        trackingNumber: `TRK${Date.now()}`
      };
      setOrders(prev => [newOrder, ...prev]);
    }
  }, [searchParams]);

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Render success message for new order
  const renderSuccessMessage = () => {
    if (!newOrderId) return null;
    
    return (
      <div className="mb-8 p-4 bg-green-100 border border-green-300 rounded-2xl">
        <div className="flex items-center">
          <div className="text-2xl mr-3">✅</div>
          <div>
            <h3 className="text-lg font-bold text-green-800 font-fredoka">
              Order Placed Successfully!
            </h3>
            <p className="text-green-700 font-quicksand">
              Your order #{newOrderId} has been confirmed and is being processed.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render page header
  const renderPageHeader = () => (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 font-fredoka">
        <span className="bg-gradient-to-r from-stone-700 to-amber-600 bg-clip-text text-transparent">
          Order
        </span>
        <span className="bg-gradient-to-r from-amber-600 to-stone-600 bg-clip-text text-transparent">
          {' '}History
        </span>
      </h1>
      <p className="text-xl text-stone-700 font-quicksand">
        Track your past orders and reorder your favorites
      </p>
    </div>
  );

  // Render filters
  const renderFilters = () => (
    <div className="mb-8">
      <OrderSearch 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <OrderFilter
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
    </div>
  );

  // Render orders list
  const renderOrdersList = () => (
    <div className="space-y-6">
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-stone-700 mb-2 font-fredoka">No orders found</h3>
          <p className="text-stone-600 font-quicksand">
            {searchQuery || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'You haven\'t placed any orders yet'
            }
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderPageHeader()}
        {renderSuccessMessage()}
        {renderFilters()}
        {renderOrdersList()}
      </div>
    </div>
  );
};

export default OrderHistory;
