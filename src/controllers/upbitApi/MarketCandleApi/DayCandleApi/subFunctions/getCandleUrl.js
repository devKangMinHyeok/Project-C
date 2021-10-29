const getCandleUrl = (unit, market, endTime, count) => {
  const url = `https://api.upbit.com/v1/candles/${unit}?market=${market}&to=${endTime}&count=${count}`;
  return url;
};

export default getCandleUrl;
