import type { CustomError, Store } from "../src/types/types.js";

// Universal route helper function
export const handleAsyncRoute = (handler: (context?: any) => Promise<any>) => {
  return async ({ body, params, set, store }: { body?: any, params?: any, set: any, store?: Store }) => {
    try {
      return await handler({ body, params, set, store });
    } catch (error) {
      const message = (error as CustomError).message || "Internal Server Error";
      const statusCode = (error as CustomError).statusCode || 500;
      const status = (error as CustomError).status || "fail";
      
      // use status code from error if exists
      set.status = statusCode;
      
      return { status, message };
    }
  };
};

