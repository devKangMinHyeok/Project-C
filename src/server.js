import express from "express";
import rootRouter from "./routers/rootRouter";
import customServerLogger from "./controllers/usefulFunctions/customServerLogger";

const app = express();
const logger = customServerLogger(process.env.MY_TIME_ZONE);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use("/", rootRouter);

export default app;
