import parseMarketCodeObj from "./parseMarketCodeObj";

const formatMarketCodeArray = (marketCodeArray) => {
  let formattedMarketCodeArray = [];
  try {
    marketCodeArray.forEach((data) => {
      const { market, korean_name, english_name, market_warning } = data;
      const formattedData = parseMarketCodeObj(
        market,
        korean_name,
        english_name,
        market_warning
      );
      formattedMarketCodeArray.push(formattedData);
    });
    return formattedMarketCodeArray;
  } catch (error) {
    errorLogger(error, "formatMarketCodeArray");
  }
};

export default formatMarketCodeArray;
