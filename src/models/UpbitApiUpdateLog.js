import mongoose from "mongoose";

const UpbitApiUpdateLogSchema = new mongoose.Schema({
  marketCodeFull: { type: String, required: true },
  updateTime: {
    DayCandle: { type: Date },
  },
  createdAt: { type: Date, required: true, default: Date.now },
});

const UpbitApiUpdateLog = mongoose.model(
  "UpbitApiUpdateLog",
  UpbitApiUpdateLogSchema
);

export default UpbitApiUpdateLog;
