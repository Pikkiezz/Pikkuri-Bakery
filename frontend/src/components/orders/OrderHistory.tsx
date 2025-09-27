'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { OrderCard, OrderFilter } from './ui';
import { orderService } from '@/services/orderService';


const OrderHistory = () => {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [newOrderId, setNewOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await orderService.getUserOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Check for new order ID from URL
  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      setNewOrderId(orderId);
      // Refresh orders to get the new one
      const fetchOrders = async () => {
        try {
          const ordersData = await orderService.getUserOrders();
          setOrders(ordersData);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      };
      fetchOrders();
    }
  }, [searchParams]);

  // Filter orders based on status
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesStatus;
  });

 

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
      <OrderFilter
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
    </div>
  );

  // Render orders list
  const renderOrdersList = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⏳</div>
          <h3 className="text-xl font-bold text-stone-700 mb-2 font-fredoka">Loading orders...</h3>
        </div>
      );
    }

    return (
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
              {statusFilter !== 'all' 
                ? 'Try adjusting your filter criteria'
                : 'You haven\'t placed any orders yet'
              }
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderPageHeader()}
        {renderFilters()}
        {renderOrdersList()}
      </div>
    </div>
  );
};

export default OrderHistory;
