import { Elysia } from "elysia";
import * as cartService from "../service/cartService.js";
import { handleAsyncRoute } from "../../utils/routeHelpers.js";
import { checkIdMiddleware, verifyUserTokenMiddleware } from "../../utils/middleware.js";
import { simpleLogger } from "./productRouter.js";
import * as wishListService from "../service/wishListService.js";

export const cartRoutes = new Elysia()
  .use(simpleLogger())
  .use(verifyUserTokenMiddleware())

  // Get user's cart
  .get("", handleAsyncRoute(({ store }) => cartService.getCart({ store })))

  // Add item to cart
  .post("", handleAsyncRoute(({ body, store }) => cartService.addToCart({ body, store })))

  // Get cart total
  .get("/total", handleAsyncRoute(({ store }) => cartService.getAllCartTotal({ store })))

  // Select cart item
  .post("/select", handleAsyncRoute(({ body, store }) => cartService.selectCartItem({ body, store })))

  // Clear cart
  .delete("", handleAsyncRoute(({ store }) => cartService.clearCart({ store })))

  // Checkout
  .post("/checkout/preview", handleAsyncRoute(({ body, store }) => cartService.previewCheckout({ body, store })))

  .post("/checkout", handleAsyncRoute(({ body, store }) => cartService.checkout({ body, store })))


  // WishList
  .post("/wishlist", handleAsyncRoute(({ body, store }) => wishListService.addToWishList({ body, store })))
  .get("/wishlist", handleAsyncRoute(({ store }) => wishListService.getWishList({ store })))

  // Cart item operations
  .group("/:id", app => app
    .use(checkIdMiddleware())
    .patch("", handleAsyncRoute(({ params, body, store }) => cartService.updateCartItem({ params, body, store })))
    .delete("", handleAsyncRoute(({ params, store }) => cartService.removeFromCart({ params, store })))
  );
