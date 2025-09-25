// Authentication related types

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

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminResponse {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: UserResponse;
  tokens: AuthTokens;
}
