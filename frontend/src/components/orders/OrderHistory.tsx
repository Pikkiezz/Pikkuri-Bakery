'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { OrderCard } from './ui';
import { orderService, Order } from '@/services/orderService';


const OrderHistoryContent = () => {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // get orders
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

  // check new order
  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
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
        {orders.length > 0 ? (
          orders.map((order) => (
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
              You haven&apos;t placed any orders yet
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
        {renderOrdersList()}
      </div>
    </div>
  );
};

const OrderHistory = () => {
  return (
    <Suspense fallback={
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h3 className="text-xl font-bold text-stone-700 mb-2 font-fredoka">Loading orders...</h3>
          </div>
        </div>
      </div>
    }>
      <OrderHistoryContent />
    </Suspense>
  );
};

export default OrderHistory;
