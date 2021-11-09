import express from "express";
import {
  getDayCandleReset,
  getDayCandleUpdate,
  getMarketCode,
} from "../controllers/upbitApi";
import home from "../controllers/home";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/marketCode", getMarketCode);
rootRouter.get("/dayCandleReset", getDayCandleReset);
rootRouter.get("/dayCandleUpdate", getDayCandleUpdate);

export default rootRouter;
