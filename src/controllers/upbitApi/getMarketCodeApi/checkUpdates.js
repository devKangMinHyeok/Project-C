//sub Functions for checkUpdates
import errorLogger from "../../usefulFunctions/errorLogger";
import getMarketCodeFull from "./getMarketCodeFull";
import twoListHasSameContents from "./twoListHasSameContents";
import getElementListOneNotIncludeListTwo from "./getElementListOneNotIncludeListTwo";

const checkUpdates = async (newDataArray, originDataArray) => {
  try {
    const newDataMarketCodeList = getMarketCodeFull(newDataArray);
    const originDataMarketCodeList = getMarketCodeFull(originDataArray);

    const isSame = twoListHasSameContents(
      newDataMarketCodeList,
      originDataMarketCodeList
    );

    if (isSame) {
      return false;
    } else {
      const newMarketCodeList = await getElementListOneNotIncludeListTwo(
        originDataMarketCodeList,
        newDataMarketCodeList
      );
      const removedMarketCodeList = await getElementListOneNotIncludeListTwo(
        newDataMarketCodeList,
        originDataMarketCodeList
      );
      const changedMarketCodeObj = {
        newMarketCodeList,
        removedMarketCodeList,
      };

      return changedMarketCodeObj;
    }
  } catch (error) {
    errorLogger(error, "checkUpdates");
  }
};

export default checkUpdates;
