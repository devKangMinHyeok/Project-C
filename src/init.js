/* Copyright Kang MinHyeok - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Kang MinHyeok <rkdalsgur032@gmail.com>, October 2021
 */

import "./db";
import "./models/UpbitApiMarketCode";
import app from "./server";
import getTimeNow from "./controllers/usefulFunctions/getTimeNow";

const PORT = process.env.PORT || 3000;

const handleListening = () => {
  console.log(
    `[${getTimeNow()}] Server listening on port http://localhost:${PORT}`
  );
};

app.listen(PORT, handleListening);
