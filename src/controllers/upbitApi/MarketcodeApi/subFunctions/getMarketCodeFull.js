import errorLogger from "../../../usefulFunctions/errorLogger";

const getMarketCodeFull = (DataArray) => {
  let marketCodeList = [];
  try {
    DataArray.forEach((data) => {
      marketCodeList.push(data.marketCodeFull);
    });
    return marketCodeList;
  } catch (error) {
    errorLogger(error, "getMarketCodeFull");
  }
};
export default getMarketCodeFull;
