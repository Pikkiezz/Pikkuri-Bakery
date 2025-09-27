

export interface CreateOrderBody {
  itemIds: number[]; // Cart item IDs ที่จะสร้าง Order
  shippingAddress: string;
  phone: string;
  shippingMethod?: string;
  shippingCost?: number;
  paymentMethod: PaymentMethod;
  paymentDetails?: CreditCardDetails | BankTransferDetails | EWalletDetails;
}

export interface OrderResponse {
  id: number;
  userId: number;
  status: string;
  total: number;
  items: {
    id: number;
    productId: number;
    quantity: number;
    price: number;
    product: {
      id: number;
      name: string;
      imageUrl: string | null;
    };
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CancelOrderBody {
  orderId: number;
  reason?: string;
}

export interface AddOrderItemBody {
  orderId: number;
  productId: number;
  quantity: number;
}

export interface UpdateOrderItemBody {
  quantity: number;
}

// Import payment types
import { PaymentMethod, CreditCardDetails, BankTransferDetails, EWalletDetails } from './payment';
