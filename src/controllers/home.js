import MarketCodeApi from "./upbitApi/MarketcodeApi/MarketCodeApi";
import errorLogger from "./usefulFunctions/errorLogger";

const home = async (req, res) => {
  const url = process.env.UPBIT_MARKET_CODE_API_URL;
  const options = { method: "GET", headers: { Accept: "application/json" } };

  try {
    const apiMC = new MarketCodeApi(url, options);
    apiMC.init();
    return res.render("home");
  } catch (error) {
    errorLogger(error, "home");
  }
};

export default home;
