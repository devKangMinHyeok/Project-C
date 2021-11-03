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
  prevClosingPrice: { type: Number },
  changePrice: { type: Number },
  changeRate: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const UpbitApiDayCandle = mongoose.model(
  "UpbitApiDayCandle",
  UpbitApiDayCandleSchema
);

export default UpbitApiDayCandle;
