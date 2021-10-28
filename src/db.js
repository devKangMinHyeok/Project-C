import mongoose from "mongoose";
import handleOpen from "./controllers/dbFunctions/handleOpen";
import handleError from "./controllers/dbFunctions/handleError";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("error", handleError);
db.once("open", handleOpen);

export default db;
