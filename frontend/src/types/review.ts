// Review related types

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
