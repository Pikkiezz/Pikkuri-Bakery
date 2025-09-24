import { apiClient, API_CONFIG } from '@/config/api';

export interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  emoji?: string;
}

export interface CheckoutRequest {
  items: CheckoutItem[];
  shippingAddress: string;
  paymentMethod: string;
  total: number;
}

export interface CheckoutResponse {
  orderId: string;
  status: string;
  message: string;
  trackingNumber?: string;
}

export class CheckoutService {
  async processCheckout(data: CheckoutRequest): Promise<CheckoutResponse> {
    try {
      // TODO: Implement checkout API when backend is ready
      // const response = await apiClient.post<CheckoutResponse>(
      //   API_CONFIG.ENDPOINTS.CHECKOUT.PROCESS,
      //   data
      // );
      // return response;
      
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            orderId: `ORDER-${Date.now()}`,
            status: 'pending',
            message: 'Order placed successfully (mock)',
            trackingNumber: `TRK-${Date.now()}`
          });
        }, 1000);
      });
    } catch (error) {
      console.error('Checkout failed:', error);
      throw new Error('Failed to process checkout. Please try again.');
    }
  }

  async getOrderById(orderId: string): Promise<any> {
    try {
      // TODO: Implement get order API when backend is ready
      // const response = await apiClient.get(API_CONFIG.ENDPOINTS.ORDERS.BY_ID(orderId));
      // return response;
      
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: orderId,
            status: 'pending',
            total: 0,
            items: [],
            createdAt: new Date().toISOString()
          });
        }, 500);
      });
    } catch (error) {
      console.error('Failed to fetch order:', error);
      throw new Error('Failed to fetch order details.');
    }
  }
}

export const checkoutService = new CheckoutService();
