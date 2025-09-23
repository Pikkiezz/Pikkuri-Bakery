import { Elysia } from "elysia";
import dotenv from "dotenv";
import { productRoutes } from "./router/productRouter.js";
import * as errorsHandler from "../utils/errors.js";
import { userRoutes } from "./router/userRouters.js";
import { adminRoutes } from "./router/adminRouter.js";
import { cartRoutes } from "./router/cartRouter.js";
import { reviewRoutes } from "./router/reviewRouter.js";
import { orderRoutes } from "./router/orderRouter.js";
import { cors } from "@elysiajs/cors";

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 3001;

const app = new Elysia()
  // .use(
  //   cors({
  //     origin: "*",
  //   })
  // )

  .use(
    cors({
      origin: true,  
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
      allowedHeaders: ["Content-Type", "Authorization"], 
      credentials: true,  
    })
  )

  .mount("/api/v1/products", productRoutes)
  .mount("/api/v1/users", userRoutes)
  .mount("/api/v1/admins", adminRoutes)
  .mount("/api/v1/cart", cartRoutes)
  .mount("/api/v1/reviews", reviewRoutes)
  .mount("/api/v1/orders", orderRoutes)

  .all("*", ({ set, request }) => {
    set.status = 404;
    return {
      status: "fail",
      message: `Path ${new URL(request.url).pathname} Not Found in server`,
    };
  })

  .listen(PORT);

console.log(`Server is running on port ${PORT}`);
