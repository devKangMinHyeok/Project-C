import MarketCodeApi from "./upbitApi/MarketcodeApi/MarketCodeApi";
import errorLogger from "./usefulFunctions/errorLogger";

const getMarketCode = async (req, res) => {
  const url = process.env.UPBIT_MARKET_CODE_API_URL;
  const options = { method: "GET", headers: { Accept: "application/json" } };

  try {
    const apiMC = new MarketCodeApi(url, options);
    apiMC.init();
    return res.render("marketCode");
  } catch (error) {
    errorLogger(error, "getMarketCode");
  }
};

export default getMarketCode;
