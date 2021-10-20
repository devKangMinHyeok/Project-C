/* Copyright Kang MinHyeok - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Kang MinHyeok <rkdalsgur032@gmail.com>, October 2021
 */

const url =
  "https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=200&convertingPriceUnit=KRW";
const options = { method: "GET", headers: { Accept: "application/json" } };

fetch(url, options).then((res) => console.log(res.json()));
