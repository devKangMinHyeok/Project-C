import errorLogger from "../../../usefulFunctions/errorLogger";

const convertToOriginalData = async (originalArray, extractList) => {
  try {
    const resultArray = await originalArray.filter((marketCode) => {
      return extractList.includes(marketCode.marketCodeFull);
    });
    return resultArray;
  } catch (error) {
    errorLogger(error, "convertToOriginalData");
  }
};

export default convertToOriginalData;
