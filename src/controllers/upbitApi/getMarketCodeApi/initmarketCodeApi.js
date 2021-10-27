// DB Model
import UpbitApiMarketCode from "../../../models/UpbitApiMarketCode";

//sub Functions for initMarketCodeApi
import errorLogger from "../../usefulFunctions/errorLogger";
import getMarketCodeArray from "./getMarketCodeArray";
import formatMarketCodeArray from "./formatMarketCodeArray";
import checkUpdates from "./checkUpdates";
import updateMarketCodeDatabase from "./updateMarketCodeDatabase";

const initMarketCodeApi = async () => {
  const url = "https://api.upbit.com/v1/market/all?isDetails=true";
  const options = { method: "GET", headers: { Accept: "application/json" } };
  try {
    const marketCodeArray = await getMarketCodeArray(url, options);
    const originDataArray = await UpbitApiMarketCode.find({});

    let formattedMarketCodeArray = await formatMarketCodeArray(marketCodeArray);

    const isUpdated = await checkUpdates(
      formattedMarketCodeArray,
      originDataArray
    );

    if (isUpdated) {
      console.log("updated!!");
      console.log(isUpdated);
      await updateMarketCodeDatabase(
        formattedMarketCodeArray,
        originDataArray,
        isUpdated
      );
    }
  } catch (error) {
    errorLogger(error, "getMarketCodeApi");
  }
};

export default initMarketCodeApi;

/* test dataset
  const marketCodeArray = [
    {
      market: "KRW-TEST",
      korean_name: "테스트코인",
      english_name: "testcoin",
      market_warning: "NONE",
    },
    {
      market: "KRW-TEST2",
      korean_name: "테스트코인2",
      english_name: "testcoin2",
      market_warning: "NONE",
    },
  ];
*/
