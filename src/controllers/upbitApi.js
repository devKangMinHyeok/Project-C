import MarketCodeApi from "./upbitApi/MarketCodeApi/MarketCodeApi";
import DayCandleApi from "./upbitApi/MarketCandleApi/dayCandleApi/dayCandleApi";
import errorLogger from "./usefulFunctions/errorLogger";

import dayjs from "dayjs";

//DB Model
import UpbitApiMarketCode from "../models/UpbitApiMarketCode";

export const getMarketCode = async (req, res) => {
  const url = process.env.UPBIT_MARKET_CODE_API_URL;
  const options = { method: "GET", headers: { Accept: "application/json" } };

  try {
    const apiMC = new MarketCodeApi(url, options);
    await apiMC.init();
    return res.render("marketCode");
  } catch (error) {
    errorLogger(error, "getMarketCode");
  }
};

export const getDayCandleReset = async (req, res) => {
  try {
    const marketCodeData = await UpbitApiMarketCode.find({});
    for (let i = 0; i < marketCodeData.length; i++) {
      const apiDC = new DayCandleApi(
        marketCodeData[i].marketCodeFull,
        dayjs(marketCodeData[i].crapeDay)
          .tz("Asia/Seoul")
          .format("YYYY-MM-DD HH:mm:ss"),
        "2021-10-29 10:00:00"
      );
      const candleData = await apiDC.init();
      const formattedCandleData = await apiDC.updateCandleDatabase();
    }

    return res.render("dayCandle");
  } catch (error) {
    errorLogger(error, "getDayCandleReset");
  }
};
