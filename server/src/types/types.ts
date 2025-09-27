export interface CustomError extends Error {
  statusCode?: number;
  status?: string;
}

export interface Headers {
  authorization?: any;
  'content-type'?: any;
  'user-agent'?: any;
  [key: string]: string | string[] | undefined;
}


export interface Store {
  userId?: number;
  username?: string;
  userData?: {
    userId: number;
    username: string;
    email: string;
  };
  adminId?: number;
  adminData?: {
    adminId: number;
    username: string;
    email: string;
  };
}



  // ------------ User Types ------------

  export interface CreateUserBody {
    username: string;
    email: string;
    password: string;
    phone: string; 
    address: string;
  }

  
  export interface LoginUserBody {
    username: string | undefined;
    email: string | undefined;
    password: string;
  }

  // ------------ Admin Types ------------


  export interface CreateAdminBody {
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  }

  export interface LoginAdminBody {
    username: string | undefined;
    email: string | undefined;
    password: string;
  }
  

  
  export interface CreateProductBody {
    name: string;
    price: number;
    stock: number;
    description: string;
    categoryId: number;
    createdById: number;
  }
  
export interface ProductResponse {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl: string | null;
    description: string | null;
    categoryId: number;
    updatedById: number;
    createdAt: Date;
    updatedAt: Date;
  }

  // ------------ Category Types ------------

  export interface CreateCategoryBody {
    name: string;
    description: string;
    createdById: number;
  }

  export interface CategoryResponse {
    id: number;
    name: string;
    description: string;
    createdById: number;
    createdAt: Date;
    updatedAt: Date;
  }

  // ------------ Review Types ------------

  export interface AddReviewBody {
    productId: number;
    rating: number;
    comment?: string;
  }

  export interface UpdateReviewBody {
    rating?: number;
    comment?: string;
  }

  export interface ReviewResponse {
    id: number;
    userId: number;
    productId: number;
    rating: number;
    comment: string | null;
    user: {
      id: number;
      username: string;
    };
    product: {
      id: number;
      name: string;
    };
    createdAt: Date;
    updatedAt: Date;
  }

  // ------------ Cart Types ------------

  export interface AddToCartBody {
    productId: number;
    quantity: number;
  }

  export interface UpdateCartItemBody {
    quantity: number;
  } 

  export interface SelectCartItemBody {
    itemIds: number[];
  }


// ------------ Payment Types ------------

export interface CreditCardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface BankTransferDetails {
  bankName: string;
  accountNumber: string;
}

export interface EWalletDetails {
  walletProvider: string;
  accountNumber: string;
}

export type PaymentMethod = "CREDIT_CARD" | "BANK_TRANSFER" | "CASH_ON_DELIVERY" | "E_WALLET";

export interface PaymentResult {
  method: PaymentMethod;
  amount: number;
  status: "SUCCESS" | "PENDING";
  message: string;
  deliveryDate?: string;
}

  // ------------ Order Types ------------

  export interface CreateOrderBody {
    itemIds: number[];  // Cart item IDs ที่จะสร้าง Order
    shippingAddress: string;
    phone: string;
    shippingMethod?: string; // Optional shipping method
    shippingCost?: number;   // Optional shipping cost
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

  // ------------ Order Item Types ------------

  export interface AddOrderItemBody {
    orderId: number;
    productId: number;
    quantity: number;
  }

  export interface UpdateOrderItemBody {
    quantity: number;
  }

  // // ------------ WishList Types ----------
  // export interface AddToWishListBody {
  //   productId: number;
  // }

  // export interface WishListResponse {
  //   id: number;
  //   userId: number;
  //   productId: number;
  // }