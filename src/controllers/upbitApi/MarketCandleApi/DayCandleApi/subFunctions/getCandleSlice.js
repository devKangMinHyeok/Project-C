import dayjs from "dayjs";
import errorLogger from "../../../../usefulFunctions/errorLogger";

const setDayCallOption = (MAX_NUM, candleNum) => {
  let callTimes = 0;
  let lastCount = 0;

  try {
    if (candleNum >= MAX_NUM) {
      callTimes = Math.floor(candleNum / MAX_NUM);
      if (candleNum % MAX_NUM) {
        callTimes++;
        lastCount = candleNum % MAX_NUM;
      } else {
        lastCount = MAX_NUM;
      }
    } else if (candleNum < MAX_NUM && candleNum > 0) {
      callTimes = 1;
      lastCount = candleNum;
    } else if (candleNum === 0) {
      callTimes = 0;
      lastCount = 0;
    } else {
      throw error;
    }
    return { callTimes, lastCount };
  } catch (error) {
    errorLogger(error, "getCandleSlice<-setDayCallOption");
  }
};

const getSubTimeStamp = (endDate, MAX_NUM) => {
  try {
    return endDate.subtract(MAX_NUM, "day").format();
  } catch (error) {
    errorLogger(error, "getCandleSlice<-getTimeStamp");
  }
};

const getTimeStamps = (endDate, MAX_NUM, callTimes) => {
  let timeStamps = [];
  let timeStamp;
  let tempStamp = endDate;

  for (let i = 0; i < callTimes - 1; i++) {
    timeStamp = getSubTimeStamp(tempStamp, MAX_NUM);
    tempStamp = dayjs(timeStamp, "YYYY-MM-DD HH:mm:ss");
    timeStamps.push(tempStamp.format("YYYY-MM-DD HH:mm:ss"));
  }

  return timeStamps;
};

const getDiff = (startTime, endTime) => {
  try {
    const MAX_CALL_TIMES = 200;
    const startDate = dayjs(startTime, "YYYY-MM-DD HH:mm:ss");
    const endDate = dayjs(endTime, "YYYY-MM-DD HH:mm:ss");

    const diffDay = endDate.diff(startDate, "day");
    const candleNum = diffDay + 1;

    const { callTimes, lastCount } = setDayCallOption(
      MAX_CALL_TIMES,
      candleNum
    );

    const timeStamps = getTimeStamps(endDate, MAX_CALL_TIMES, callTimes);

    const resultObj = {
      startDate: startDate.format("YYYY-MM-DD HH:mm:ss"),
      endDate: endDate.format("YYYY-MM-DD HH:mm:ss"),
      diffDay,
      candleNum,
      callTimes,
      lastCount,
      timeStamps,
      MAX_CALL_TIMES,
    };
    return resultObj;
  } catch (error) {
    errorLogger(error, "getCandleSlice<-getDiff");
  }
};

const getCandleSlice = (startTime, endTime) => {
  const diff = getDiff(startTime, endTime);
  return diff;
};

export default getCandleSlice;
