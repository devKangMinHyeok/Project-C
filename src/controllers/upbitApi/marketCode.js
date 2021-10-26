import fetch from "node-fetch";

const getMarketCodeApi = async () => {
  const url = "https://api.upbit.com/v1/market/all?isDetails=true";
  const options = { method: "GET", headers: { Accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const marketCodeArray = await response.json();
    marketCodeArray.forEach((data) => {
      console.log(data.market);
    });
  } catch (error) {
    console.log("error:" + error);
  }
};

export default getMarketCodeApi;
