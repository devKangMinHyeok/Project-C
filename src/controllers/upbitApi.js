import MarketCodeApi from "./upbitApi/MarketCodeApi/MarketCodeApi";
import DayCandleApi from "./upbitApi/MarketCandleApi/dayCandleApi/dayCandleApi";
import errorLogger from "./usefulFunctions/errorLogger";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { updateLoggerDC, findLogs } from "./usefulFunctions/updateLogger";

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
    const thisTime = dayjs("2021-11-07")
      .tz("Asia/Seoul")
      .format("YYYY-MM-DD HH:mm:ss");
    for (let i = 0; i < marketCodeData.length; i++) {
      const apiDC = new DayCandleApi(
        marketCodeData[i].marketCodeFull,
        dayjs(marketCodeData[i].crapeDay)
          .tz("Asia/Seoul")
          .format("YYYY-MM-DD HH:mm:ss"),
        thisTime
      );
      const candleData = await apiDC.init();
      const formattedCandleData = await apiDC.updateCandleDatabase();
      const updates = await updateLoggerDC(
        marketCodeData[i].marketCodeFull,
        formattedCandleData[0].candleTimeKST
      );
    }

    return res.render("dayCandle");
  } catch (error) {
    errorLogger(error, "getDayCandleReset");
  }
};

export const getDayCandleUpdate = async (req, res) => {
  dayjs.extend(isSameOrAfter);
  const marketCodeData = await UpbitApiMarketCode.find({});
  const thisTime = dayjs();
  for (let i = 0; i < marketCodeData.length; i++) {
    const updateLogs = await findLogs(marketCodeData[i].marketCodeFull);
    const updateTime = updateLogs.updateTime.DayCandle;
    const nextDay = dayjs(updateTime).add(1, "day");
    if (thisTime.isSameOrAfter(nextDay, "")) {
      console.log("here");
      const apiDC = new DayCandleApi(
        marketCodeData[i].marketCodeFull,
        nextDay.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"),
        thisTime.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss")
      );
      const candleData = await apiDC.init();
      const formattedCandleData = await apiDC.updateCandleDatabase();
      const updates = await updateLoggerDC(
        marketCodeData[i].marketCodeFull,
        formattedCandleData[0].candleTimeKST
      );
    } else {
      console.log(
        `Already Updated Today for ${marketCodeData[i].marketCodeFull}`
      );
    }
  }
};
