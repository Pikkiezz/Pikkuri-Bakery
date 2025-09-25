// Cart related types

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

export interface CartItemResponse {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  price: number;
  isSelected: boolean;
  product: {
    id: number;
    name: string;
    imageUrl: string | null;
    stock: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CartResponse {
  id: number;
  userId: number;
  items: CartItemResponse[];
  total: number;
  selectedTotal: number;
  createdAt: Date;
  updatedAt: Date;
}
