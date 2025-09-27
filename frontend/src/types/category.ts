
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

export interface UpdateCategoryBody {
  name?: string;
  description?: string;
}
