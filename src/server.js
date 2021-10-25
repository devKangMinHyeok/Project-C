import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";

const app = express();
const logger = morgan(
  ":date :method :url :status :response-time ms - :res[content-length]"
);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use("/", rootRouter);

export default app;
