import type { CustomError } from "../src/types/types.js";

// Custom Error Classes
export class ValidationError extends Error {
  statusCode = 400;
  status = "fail";
  
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  statusCode = 404;
  status = "fail";
  
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class DatabaseError extends Error {
  statusCode = 500;
  status = "fail";
  
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

// export const apierrors = ({ error, set }: { error: any, set: any }) => {
//     const customError = error as CustomError;
//     const statusCode = customError.statusCode || 500;
//     const status = customError.status || "fail";
//     const message = customError.message || "Internal Server Error";
    
//     set.status = statusCode;
//     return {
//       status: status,
//       message: message
//     }
//   }
