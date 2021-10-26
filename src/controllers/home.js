import getMarketCodeApi from "./upbitApi/marketCode";

const home = async (req, res) => {
  getMarketCodeApi();
  return res.render("home");
};

export default home;
