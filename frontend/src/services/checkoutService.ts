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
  phone: string;
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
      // Call real checkout API
      const response = await apiClient.post<CheckoutResponse>(
        '/carts/checkout',
        {
          itemIds: data.items.map(item => item.id),
          shippingAddress: data.shippingAddress,
          phone: data.phone,
          paymentMethod: data.paymentMethod,
          shippingMethod: 'STANDARD' // Default shipping method
        }
      );
      return response.data!;
      
    } catch (error) {
      console.error('Checkout failed:', error);
      throw new Error('Failed to process checkout. Please try again.');
    }
  }
}

export const checkoutService = new CheckoutService();
