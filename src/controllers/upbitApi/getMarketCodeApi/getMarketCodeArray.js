import fetch from "node-fetch";

const getMarketCodeArray = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const marketCodeArray = await response.json();
    return marketCodeArray;
  } catch (error) {
    errorLogger(error, "getMarketCodeArray");
  }
};

export default getMarketCodeArray;
