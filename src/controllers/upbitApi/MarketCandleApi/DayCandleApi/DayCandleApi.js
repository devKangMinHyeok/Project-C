//DB Model
import UpbitApiDayCandle from "../../../../models/UpbitApiDayCandle";

// DayCandleApi Class
import errorLogger from "../../../usefulFunctions/errorLogger";
import getCandleUrl from "./subFunctions/getCandleUrl";
import getCandleSlice from "./subFunctions/getCandleSlice";

//For getApi
import marketCandleFetch from "../marketCandleFetch";

//For updateCandleDatabase
import parseDayCandleObj from "./subFunctions/parseDayCandleObj";

class DayCandleApi {
  constructor(marketCode, startTime, endTime) {
    this.marketCode = marketCode;
    this.endTime = endTime;
    this.options = { method: "GET", headers: { Accept: "application/json" } };
    this.sliceInfo = getCandleSlice(startTime, this.endTime);
    this.MAX_CALL_TIMES = this.sliceInfo.MAX_CALL_TIMES;
    this.callTimes = this.sliceInfo.callTimes;
    this.candleNum = this.sliceInfo.candleNum;
    this.lastCount = this.sliceInfo.lastCount;
    this.timeStamps = this.sliceInfo.timeStamps;
    this.unit = "days";
    console.log(this.sliceInfo);
  }

  init = async () => {
    try {
      this.candleUrls = this.getCandleUrls();
      console.log(this.candleUrls);
      this.candleData = [];
      for (let i = 0; i < this.candleUrls.length; i++) {
        const url = this.candleUrls[i];
        const dayCandleArray = await this.getApi(url);
        this.candleData.push(...dayCandleArray);
      }
      console.dir(this.candleData, { maxArrayLength: null });
      console.log(`Completed Loading ${this.marketCode} Data`);
      return this.candleData;
    } catch (error) {
      errorLogger(error, "DayCandleApi<-init");
    }
  };

  getApi = async (url) => {
    try {
      return await marketCandleFetch(url, this.options);
    } catch (error) {
      errorLogger(error, "DayCandleApi<-getApi");
    }
  };

  getCandleUrls = () => {
    let candleUrls = [];
    if (this.callTimes === 1) {
      candleUrls.push(
        getCandleUrl(this.unit, this.marketCode, this.endTime, this.lastCount)
      );
    } else if (this.callTimes > 1) {
      candleUrls.push(
        getCandleUrl(
          this.unit,
          this.marketCode,
          this.endTime,
          this.MAX_CALL_TIMES
        )
      );
      for (let i = 0; i < this.callTimes - 2; i++) {
        candleUrls.push(
          getCandleUrl(
            this.unit,
            this.marketCode,
            this.timeStamps[i],
            this.MAX_CALL_TIMES
          )
        );
      }
      candleUrls.push(
        getCandleUrl(
          this.unit,
          this.marketCode,
          this.timeStamps[this.timeStamps.length - 1],
          this.lastCount
        )
      );
    } else if (this.callTimes === 0) {
      console.log("callTimes is 0");
    } else {
      throw error;
    }
    return candleUrls;
  };

  updateCandleDatabase = async () => {
    console.log("now");
    this.formatCandleData = [];

    for (let i = 0; i < this.candleData.length; i++) {
      this.formatCandleData.push(parseDayCandleObj(this.candleData[i]));
    }
    console.dir(this.formatCandleData, { maxArrayLength: null });

    for (let i = 0; i < this.formatCandleData.length; i++) {
      await UpbitApiDayCandle.create(this.formatCandleData[i]);
    }
    return this.formatCandleData;
  };
}

export default DayCandleApi;
