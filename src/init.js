/* Copyright Kang MinHyeok - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Kang MinHyeok <rkdalsgur032@gmail.com>, October 2021
 */

import app from "./server";

const PORT = 3000;

const timeNow = () => {
  const time = new Date();
  const hour = time.getHours().toString().padStart(2, "0");
  const minute = time.getMinutes().toString().padStart(2, "0");
  const second = time.getSeconds().toString().padStart(2, "0");

  return `${hour}:${minute}:${second}`;
};

const handleListening = () => {
  console.log(
    `[${timeNow()}] Server listening on port http://localhost:${PORT}`
  );
};

app.listen(PORT, handleListening);
