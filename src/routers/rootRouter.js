import express from "express";
import { getDayCandle, getMarketCode } from "../controllers/upbitApi";
import home from "../controllers/home";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/marketCode", getMarketCode);
rootRouter.get("/dayCandle", getDayCandle);

export default rootRouter;
