import { Elysia } from "elysia";
import * as reviewService from "../service/reviewService.js";
import { handleAsyncRoute } from "../../utils/routeHelpers.js";
import { checkIdMiddleware, verifyUserTokenMiddleware } from "../../utils/middleware.js";
import { simpleLogger } from "./productRouter.js";

export const reviewRoutes = new Elysia()
  .use(simpleLogger())

  // Public routes (ไม่ต้องใช้ token)
  .get("/product/:productId", handleAsyncRoute(({ params }) => reviewService.getProductReviews({ params })))

  // Protected routes (ต้องใช้ token)
  .use(verifyUserTokenMiddleware())
  
  // User's reviews
  .get("/my-reviews", handleAsyncRoute(({ store }) => reviewService.getUserReviews({ store })))
  
  // Add review
  .post("", handleAsyncRoute(({ body, store }) => reviewService.addReview({ body, store })))

  // Review operations
  .group("/:id", app => app
    .use(checkIdMiddleware())
    .patch("", handleAsyncRoute(({ params, body, store }) => reviewService.updateReview({ params, body, store })))
    .delete("", handleAsyncRoute(({ params, store }) => reviewService.deleteReview({ params, store })))
  );
