import { Elysia } from "elysia";
import { handleAsyncRoute } from "../../utils/routeHelpers.js";
import * as categoryService from "../service/categoryService.js";

export const categoryRoutes = new Elysia()
  
  // Public routes
  .group("/", app => app
    .get("/", handleAsyncRoute(() => categoryService.getCategories()))
    .get("", handleAsyncRoute(() => categoryService.getCategories()))
  );
