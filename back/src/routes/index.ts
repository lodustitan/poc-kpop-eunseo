import { Router } from "express";
import controller from "../controllers/index";
import authMiddleware from "../middlewares/authentication.middleware";
import middleware from "../middlewares/index";
import validateSchema from "../middlewares/validateSchema.middleware";
import Schemas from "../schemas/model";

import authRoute from "./auth.route";

//* Authentication

//* User

//* Market
route.get("/market", authMiddleware, middleware.getIdols, controller.market.getMarket);
route.post("/market/add/:id", authMiddleware, controller.market.addIdolMarket);
route.post("/market/buy/:id", authMiddleware, controller.market.buyIdolMarket);

//* Tools
route.get("/idols", authMiddleware, middleware.getIdols, controller.tools.getAllIdols)

export default route;