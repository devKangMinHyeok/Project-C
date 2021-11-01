import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import getCandleUrl from "./getCandleUrl";
import marketCandleFetch from "../../marketCandleFetch";
import errorLogger from "../../../../usefulFunctions/errorLogger";

dayjs.extend(utc);
dayjs.extend(timezone);

const getStartDay = async (market) => {
  try {
    const currentDay = dayjs().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
    const currentUrl = getCandleUrl("days", market, currentDay, 200);
    const options = { method: "GET", headers: { Accept: "application/json" } };

    let startDay = null;
    let result = await marketCandleFetch(currentUrl, options);

    while (true) {
      if (result.length < 200 && result.length > 0) {
        startDay = result[result.length - 1].candle_date_time_kst;
        break;
      } else if (result.length === 0) {
        break;
      } else if (result.length >= 200) {
        startDay = result[result.length - 1].candle_date_time_kst;
        const formatDay = dayjs(startDay).format("YYYY-MM-DD HH:mm:ss");
        const formatUrl = getCandleUrl("days", market, formatDay, 200);
        result = await marketCandleFetch(formatUrl, options);
      }
    }

    return dayjs(startDay).format("YYYY-MM-DD HH:mm:ss");
  } catch (error) {
    errorLogger(error, "getStartDay");
  }
};

export default getStartDay;
