import express from "express";
import rootRouter from "./routers/rootRouter";
import customServerLogger from "./controllers/usefulFunctions/customServerLogger";

const myTimezone = "Asia/Tokyo";

const app = express();
const logger = customServerLogger(myTimezone);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use("/", rootRouter);

export default app;
