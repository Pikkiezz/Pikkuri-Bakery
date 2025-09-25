// Product related types

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
  totalSold?: number; // For popular products
  category?: {
    name: string;
  };
}



export interface ProductFilters {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
  minSold?: number;
  maxSold?: number;
  sortBy?: 'name' | 'price' | 'stock' | 'totalSold' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface SearchProductBody {
  name: string;
}

export interface UpdateProductBody {
  name?: string;
  price?: number;
  stock?: number;
  description?: string;
  categoryId?: number;
  imageUrl?: string;
}

export interface ProductsResponse {
  response: ProductResponse[];
  popularProducts: ProductResponse[];
  newProducts: ProductResponse[];
}
