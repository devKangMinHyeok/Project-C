import errorLogger from "../../usefulFunctions/errorLogger";

const convertOriginalMarketCodeData = async (originalArray, extractList) => {
  try {
    const resultArray = await originalArray.filter((marketCode) => {
      return extractList.includes(marketCode.marketCodeFull);
    });
    return resultArray;
  } catch (error) {
    errorLogger(error, "convertOriginalMarketCodeData");
  }
};

export default convertOriginalMarketCodeData;
