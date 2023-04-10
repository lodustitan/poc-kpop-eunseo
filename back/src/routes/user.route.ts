import { Router } from "express";

import controller from "../controllers";
import middleware from "../middlewares";

import Schemas from "../schemas/model";
import authMiddleware from "../middlewares/authentication.middleware";
import validateSchema from "../middlewares/validateSchema.middleware";

const route = Router();

route
    .all("*", authMiddleware)
    .post("/work", controller.tools.doWork)
    .post("/gacha", controller.tools.doGacha)
    .get("/inv", controller.users.user_getUserIdols);

export default route;