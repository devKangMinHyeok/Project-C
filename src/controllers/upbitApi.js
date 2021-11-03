import MarketCodeApi from "./upbitApi/MarketCodeApi/MarketCodeApi";
import DayCandleApi from "./upbitApi/MarketCandleApi/dayCandleApi/dayCandleApi";
import errorLogger from "./usefulFunctions/errorLogger";

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

export const getDayCandle = async (req, res) => {
  try {
    const apiDC = new DayCandleApi(
      "KRW-BTC",
      "2021-01-01 00:00:01",
      "2021-10-29 00:00:01"
    );
    const candleData = await apiDC.init();
    const formattedCandleData = await apiDC.updateCandleDatabase();

    return res.render("dayCandle", { formattedCandleData });
  } catch (error) {
    errorLogger(error, "getDayCandle");
  }
};
