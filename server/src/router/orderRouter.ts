import { Elysia } from "elysia";
import * as orderService from "../service/orderService.js";
import { handleAsyncRoute } from "../../utils/routeHelpers.js";
import { checkIdMiddleware, verifyUserTokenMiddleware, verifyAdminTokenMiddleware } from "../../utils/middleware.js";
import { simpleLogger } from "./productRouter.js";

export const orderRoutes = new Elysia()
  .use(simpleLogger())

  // User routes
  .group("/user", app => app
    .use(verifyUserTokenMiddleware())
    
    // Get user's orders
    .get("", handleAsyncRoute(({ store }) => orderService.getUserOrders({ store })))
    
    // Get order by ID
    .get("/:id", app => app
      .use(checkIdMiddleware())
      .get("", handleAsyncRoute(({ params, store }) => orderService.getOrderById({ params, store })))
    )
    
    // Cancel order
    .post("/cancel", handleAsyncRoute(({ body, store }) => orderService.cancelOrder({ body, store })))
  )

  // Admin routes
  .group("/admin", app => app
    .use(verifyAdminTokenMiddleware())
    
    // Update order status
    .patch("/:id/status", app => app
      .use(checkIdMiddleware())
      .patch("", handleAsyncRoute(({ params, body, store }) => orderService.updateOrderStatus({ params, body, store })))
    )
  );

