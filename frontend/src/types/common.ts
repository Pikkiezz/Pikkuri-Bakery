

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

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  requestTime?: string;
  data?: T;
  message?: string;
}
