import { Elysia, t } from "elysia";
import * as userServices from "../service/userServices.js";
import { simpleLogger } from "./productRouter.js";
import { handleAsyncRoute } from "../../utils/routeHelpers.js";
import { checkIdMiddleware } from "../../utils/middleware.js";

export const userRoutes = new Elysia()
  .use(simpleLogger())

  .post("/signup", handleAsyncRoute(({ body }) => userServices.signUpUser({ body })))
  .post("/login", handleAsyncRoute(({ body, set }) => userServices.logInUser({ body, set })))
  
  .group("/", app => app
    .get("", handleAsyncRoute(() => userServices.getAllUsers()))
    .post("/logout", handleAsyncRoute(({ set }) => userServices.logOutUser({ set })))
  )
  .group("/:id", app => app
    .use(checkIdMiddleware())
    .get("", handleAsyncRoute(({ params }) => userServices.getUserById({ params })))
    .patch("", handleAsyncRoute(({ body, params }) => userServices.updateUserById({ params, body })))
    .delete("", handleAsyncRoute(({ params }) => userServices.deleteUserById({ params })))
  );
