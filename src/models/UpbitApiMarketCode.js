import mongoose from "mongoose";
import dayjs from "dayjs";
import getStartDay from "../controllers/upbitApi/MarketCandleApi/DayCandleApi/subFunctions/getStartDay";

const UpbitApiMarketCodeSchema = new mongoose.Schema({
  market: { type: String, required: true },
  marketCodeTiny: { type: String, required: true },
  marketCodeFull: { type: String, required: true },
  koreanName: { type: String, required: true },
  englishName: { type: String, required: true },
  marketWarning: { type: String, required: true },
  crapeDay: { type: Date },
  createdAt: { type: Date, required: true, default: Date.now },
});

UpbitApiMarketCodeSchema.pre("save", async function (next) {
  const startDay = await getStartDay(this.marketCodeFull);
  const formatDate = dayjs(startDay);
  this.crapeDay = formatDate.toDate();
  next();
});

const UpbitApiMarketCode = mongoose.model(
  "UpbitApiMarketCode",
  UpbitApiMarketCodeSchema
);

export default UpbitApiMarketCode;
