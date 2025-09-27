import { apiClient } from '@/config/api';

export interface Order {
  id: number;
  userId: number;
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  payment?: Payment;
  shipping?: Shipping;
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    imageUrl: string | null;
  };
}

export interface Payment {
  id: number;
  method: string;
  amount: number;
  status: string;
  transactionId?: string;
  paidAt?: string;
}

export interface Shipping {
  id: number;
  address: string;
  phone: string;
  method: string;
  cost: number;
  status: string;
  shippedAt?: string;
  deliveredAt?: string;
}

class OrderService {
  // Get user's orders
  async getUserOrders(): Promise<Order[]> {
    const response = await apiClient.get<{ status: string; data: Order[] }>('/orders/user');
    return response.data;
  }

  // Get order by ID
  async getOrderById(id: number): Promise<Order> {
    const response = await apiClient.get<{ status: string; data: Order }>(`/orders/user/${id}`);
    return response.data;
  }

  // Cancel order
  async cancelOrder(orderId: number, reason?: string): Promise<any> {
    const response = await apiClient.post<{ status: string; data: any }>('/orders/user/cancel', {
      orderId,
      reason
    });
    return response.data;
  }

  // Update order status (for auto-update)
  async updateOrderStatus(orderId: number, status: string): Promise<any> {
    const response = await apiClient.patch<{ status: string; data: any }>(`/orders/admin/${orderId}/status`, {
      status
    });
    return response.data;
  }
}

export const orderService = new OrderService();
