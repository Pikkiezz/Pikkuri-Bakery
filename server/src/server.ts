// import { Elysia } from "elysia";
// import dotenv from "dotenv";
// import { productRoutes } from "./router/productRouter.js";
// import * as errorsHandler from "../utils/errors.js";
// import { userRoutes } from "./router/userRouters.js";
// import { adminRoutes } from "./router/adminRouter.js";
// import { cartRoutes } from "./router/cartRouter.js";
// import { reviewRoutes } from "./router/reviewRouter.js";
// import { orderRoutes } from "./router/orderRouter.js";
// import { cors } from "@elysiajs/cors";

// dotenv.config({ path: ".env" });
// const PORT = process.env.PORT || 3001;

// const app = new Elysia()
//   .use(
//     cors({
//       origin: "*",
//     })
//   )

//   // .use(
//   //   cors({
//   //     origin: true,  
//   //     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
//   //     allowedHeaders: ["Content-Type", "Authorization"], 
//   //     credentials: true,  
//   //   })
//   // )

//   .mount("/api/v1/products", productRoutes)
//   .mount("/api/v1/users", userRoutes)
//   .mount("/api/v1/admins", adminRoutes)
//   .mount("/api/v1/cart", cartRoutes)
//   .mount("/api/v1/reviews", reviewRoutes)
//   .mount("/api/v1/orders", orderRoutes)

//   .all("*", ({ set, request }) => {
//     set.status = 404;
//     return {
//       status: "fail",
//       message: `Path ${new URL(request.url).pathname} Not Found in server`,
//     };
//   })

//   .listen(PORT);

// console.log(`Server is running on port ${PORT}`);


import { Elysia } from "elysia";
import dotenv from "dotenv";

import { productRoutes } from "./router/productRouter.js";
import * as errorsHandler from "../utils/errors.js";
import { userRoutes } from "./router/userRouters.js";
import { adminRoutes } from "./router/adminRouter.js";
import { cartRoutes } from "./router/cartRouter.js";
import { reviewRoutes } from "./router/reviewRouter.js";
import { orderRoutes } from "./router/orderRouter.js";

dotenv.config({ path: ".env" });

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST ?? "0.0.0.0";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.NEXT_PUBLIC_SITE_ORIGIN
].filter(Boolean) as string[];

const app = new Elysia()
  .onRequest(({ request, set }) => {
    console.log(`Incoming request: ${request.method} ${request.url}`);
    
    // Manual CORS headers
    set.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    };
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      set.status = 200;
      return '';
    }
  })
  .onAfterHandle(({ set, request }) => {
    console.log(`Response status: ${set.status} for ${request.method} ${request.url}`);
  })

  .mount("/api/v1/products", productRoutes)
  .mount("/api/v1/users", userRoutes)
  .mount("/api/v1/admins", adminRoutes)
  .mount("/api/v1/cart", cartRoutes)
  .mount("/api/v1/reviews", reviewRoutes)
  .mount("/api/v1/orders", orderRoutes)
  
  // Add a test route to verify routing is working
  .get("/api/v1/test", ({ set }) => {
    set.status = 200;
    return { message: "Test route working" };
  })

  .all("*", ({ set, request }) => {
    set.status = 404;
    return {
      status: "fail",
      message: `Path ${new URL(request.url).pathname} Not Found in server`,
    };
  })

  .listen({ port: PORT, hostname: HOST });

console.log(`Server is running at http://${HOST}:${PORT}`);
