import errorLogger from "../../../../usefulFunctions/errorLogger";

const parseDayCandleObj = (DayCandleData) => {
  try {
    if (!DayCandleData) {
      throw error;
    }
    console.log("here");
    const marketCodeFull = DayCandleData.market;
    const candleTimeKST = new Date(DayCandleData.candle_date_time_kst);
    const openingPrice = DayCandleData.opening_price;
    const highPrice = DayCandleData.high_price;
    const lowPrice = DayCandleData.low_price;
    const tradePrice = DayCandleData.trade_price;
    const lastTickTime = new Date(DayCandleData.timestamp);
    const accTradePrice = DayCandleData.candle_acc_trade_price;
    const accTradeVolume = DayCandleData.candle_acc_trade_volume;
    const prevClosingPrice = DayCandleData.prev_closing_price;
    const changePrice = DayCandleData.change_price;
    const changeRate = DayCandleData.change_rate;

    const result = {
      marketCodeFull,
      candleTimeKST,
      openingPrice,
      highPrice,
      lowPrice,
      tradePrice,
      lastTickTime,
      accTradePrice,
      accTradeVolume,
      prevClosingPrice,
      changePrice,
      changeRate,
    };

    return result;
  } catch (error) {
    errorLogger(error, "parseDayCandleObj");
  }
};

export default parseDayCandleObj;
