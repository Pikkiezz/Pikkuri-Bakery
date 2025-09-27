

export interface CustomError extends Error {
  statusCode?: number;
  status?: string;
}

export interface Headers {
  authorization?: string;
  'content-type'?: string;
  'user-agent'?: string;
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

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  requestTime?: string;
  data?: T;
  message?: string;
}
