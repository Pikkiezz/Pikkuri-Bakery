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
      const response = await apiClient.post<CheckoutResponse>(
        '/checkout/process',
        data
      );
      return response;
    } catch (error) {
      console.error('Checkout failed:', error);
      throw new Error('Failed to process checkout. Please try again.');
    }
  }

  async getOrderById(orderId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch order:', error);
      throw new Error('Failed to fetch order details.');
    }
  }
}

export const checkoutService = new CheckoutService();
