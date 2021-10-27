import getMarketCodeApi from "./upbitApi/marketCode";

const home = async (req, res) => {
  try {
    getMarketCodeApi();
    return res.render("home");
  } catch (error) {
    console.log("[ERROR in home] | " + error);
  }
};

export default home;
