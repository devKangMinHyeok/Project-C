import UpbitApiUpdateLog from "../../models/UpbitApiUpdateLog";

export const updateLoggerDC = async (marketCodeFull, updateTime) => {
  const filter = { marketCodeFull };
  const update = { updateTime: { DayCandle: updateTime } };
  let result = await UpbitApiUpdateLog.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });
  console.log(result);
  return result;
};

export const findLogs = async (marketCodeFull) => {
  const filter = { marketCodeFull };
  const log = await UpbitApiUpdateLog.findOne(filter);
  return log;
};
