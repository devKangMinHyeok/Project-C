import mongoose from "mongoose";

const UpbitApiDayCandleSchema = new mongoose.Schema({
  marketCodeFull: { type: String, required: true },
  candleTimeKST: { type: Date, required: true },
  openingPrice: { type: Number, required: true },
  highPrice: { type: Number, required: true },
  lowPrice: { type: Number, required: true },
  tradePrice: { type: Number, required: true },
  lastTickTime: { type: Date, required: true },
  accTradePrice: { type: Number, required: true },
  accTradeVolume: { type: Number, required: true },
  prevClosingPrice: { type: Number, required: true },
  changePrice: { type: Number, required: true },
  changeRate: { type: Number, required: true },
});

const UpbitApiDayCandle = mongoose.model(
  "UpbitApiDayCandle",
  UpbitApiDayCandleSchema
);

export default UpbitApiDayCandle;
