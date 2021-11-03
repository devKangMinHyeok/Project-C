/* Copyright Kang MinHyeok - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Kang MinHyeok <rkdalsgur032@gmail.com>, October 2021
 */
import "dotenv/config";
import "./db";
import "./models/UpbitApiMarketCode";
import "./models/UpbitApiDayCandle";
import app from "./server";
import handleListening from "./controllers/serverFunctions/handleListening";
import PORT from "./controllers/serverFunctions/generatePortNum";

app.listen(PORT, handleListening);
