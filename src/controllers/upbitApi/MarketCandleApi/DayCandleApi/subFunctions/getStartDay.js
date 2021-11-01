import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import fetch from "node-fetch";
import getCandleUrl from "./getCandleUrl";

dayjs.extend(utc);
dayjs.extend(timezone);

const getStartDay = async (market) => {
  const currentDay = dayjs().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
  const currentUrl = getCandleUrl("days", market, currentDay, 200);
  const options = { method: "GET", headers: { Accept: "application/json" } };

  let startDay = null;
  let response = await fetch(currentUrl, options);
  let result = await response.json();

  while (true) {
    if (result.length < 200 && result.length > 0) {
      startDay = result[result.length - 1].candle_date_time_kst;
      console.log("startday", market);
      console.log(startDay);
      break;
    } else if (result.length === 0) {
      break;
    } else if (result.length >= 200) {
      startDay = result[result.length - 1].candle_date_time_kst;
      const formatDay = dayjs(startDay).format("YYYY-MM-DD HH:mm:ss");
      const formatUrl = getCandleUrl("days", market, formatDay, 200);
      response = await fetch(formatUrl, options);
      result = await response.json();
    }
  }

  return dayjs(startDay).format("YYYY-MM-DD HH:mm:ss");
};

export default getStartDay;
