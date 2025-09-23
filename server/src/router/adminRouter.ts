import { Elysia } from "elysia";
import * as adminService from "../service/adminService.js";
import * as categoryService from "../service/categoryService.js";
import { handleAsyncRoute } from "../../utils/routeHelpers.js";
import { checkIdMiddleware, verifyAdminTokenMiddleware } from "../../utils/middleware.js";
import { simpleLogger } from "./productRouter.js";

export const adminRoutes = new Elysia()
    .use(simpleLogger())
    // .use(verifyTokenMiddleware())

    
    .post("/signup", handleAsyncRoute(({ body }) => adminService.signUpAdmin({ body })))
    .post("/login", handleAsyncRoute(({ body }) => adminService.logInAdmin({ body })))

    .use(verifyAdminTokenMiddleware())
    
    .group("/categories", app => app
        // .get("", handleAsyncRoute(() => categoryService.getAllCategories()))
        .post("", handleAsyncRoute(({ body }) => categoryService.addCategory({ body })))
    )
    
    .group("/:id", app => app
        .use(checkIdMiddleware())
        .get("", handleAsyncRoute(({ params }) => adminService.getAdminById({ params })))
        .patch("", handleAsyncRoute(({ body, params }) => adminService.updateAdminById({ params, body })))
        .delete("", handleAsyncRoute(({ params }) => adminService.deleteAdminById({ params })))
      );