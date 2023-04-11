import { Router } from "express";

import controller from "../controllers";
import middleware from "../middlewares";

import Schemas from "../schemas/model";
import authMiddleware from "../middlewares/authentication.middleware";
import validateSchema from "../middlewares/validateSchema.middleware";

const route = Router();

route
    .all("*", authMiddleware)
    .post("/buy", validateSchema(Schemas.marketBuyIdolSchema), controller.market.buyIdolMarket)
    .post("/sell", validateSchema(Schemas.marketSellIdolSchema), controller.market.addIdolMarket)
    .post("/search", validateSchema(Schemas.marketSearchSchema), controller.market.getMarket);

export default route;