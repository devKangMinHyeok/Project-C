import mongoose from "mongoose";

const UpbitApiMarketCodeSchema = new mongoose.Schema({
  market: { type: String, required: true },
  marketCodeTiny: { type: String, required: true },
  marketCodeFull: { type: String, required: true },
  koreanName: { type: String, required: true },
  englishName: { type: String, required: true },
  marketWarning: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const UpbitApiMarketCode = mongoose.model(
  "UpbitApiMarketCode",
  UpbitApiMarketCodeSchema
);

export default UpbitApiMarketCode;
