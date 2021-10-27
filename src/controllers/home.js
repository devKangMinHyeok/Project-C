import initMarketCodeApi from "./upbitApi/getMarketCodeApi/initmarketCodeApi";
import errorLogger from "./usefulFunctions/errorLogger";

const home = async (req, res) => {
  try {
    initMarketCodeApi();
    return res.render("home");
  } catch (error) {
    errorLogger(error, "home");
  }
};

export default home;
