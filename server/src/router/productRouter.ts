import { Elysia } from "elysia";
import * as productService from "../service/productService.js";
import { handleAsyncRoute } from "../../utils/routeHelpers.js";
import * as userServices from "../service/userServices.js";
import { checkIdMiddleware, verifyUserTokenMiddleware } from "../../utils/middleware.js";





export let latestRequestTime= "";

export const simpleLogger = () => (app: Elysia) => app
  .onRequest(({ request, store }) => {
    const startTime = Date.now();
    latestRequestTime = new Date().toISOString(); 
    console.log(`${request.method} ${request.url} - Started at ${latestRequestTime}`);
    
    (store as  any).startTime = startTime;
  })
  .onAfterHandle(({ request, store }) => {
    const endTime = Date.now();
    const responseTime = endTime - (store as any).startTime;
    console.log(`Completed in ${responseTime}ms`);
  });

  //--------------------------------

export const productRoutes = new Elysia()
    .use(simpleLogger())
    
    // Public routes 
    .group("/", app => app
      .get("", handleAsyncRoute(() => productService.getAllProducts()))
      .post("/search", handleAsyncRoute(({ body }) => productService.searchProductByName({ body })))
    )

    // Protected routes 
    .group("/", app => app
      .use(verifyUserTokenMiddleware())
      .post("", handleAsyncRoute(({ body }) => productService.addProduct({ body })))
    )
    
    // Protected routes with ID validation
    .group("/:id", app => app
      .use(verifyUserTokenMiddleware())
      .use(checkIdMiddleware())
      .get("", handleAsyncRoute(({ params }) => productService.getProductById({ params })))
      .patch("", handleAsyncRoute(({ body, params }) => productService.updateProductById({ params, body })))
      .delete("", handleAsyncRoute(({ params }) => productService.deleteProductById({ params })))
    );