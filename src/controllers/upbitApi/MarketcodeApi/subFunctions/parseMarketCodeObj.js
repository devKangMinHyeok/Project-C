import errorLogger from "../../../usefulFunctions/errorLogger";

const parseMarketCodeObj = (
  market_code_full,
  korean_name,
  english_name,
  market_warning
) => {
  try {
    const marketCode = market_code_full.split("-");
    const market = marketCode[0];
    const marketCodeTiny = marketCode[1];
    const parsedDataObj = {
      market: market,
      marketCodeTiny: marketCodeTiny,
      marketCodeFull: market_code_full,
      koreanName: korean_name,
      englishName: english_name,
      marketWarning: market_warning,
    };
    return parsedDataObj;
  } catch (error) {
    errorLogger(error, "parseMarketCodeObj");
  }
};
export default parseMarketCodeObj;
