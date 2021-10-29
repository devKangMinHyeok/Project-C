import express from "express";
import getMarketCode from "../controllers/upbitApi";
import home from "../controllers/home";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/marketCode", getMarketCode);

export default rootRouter;
