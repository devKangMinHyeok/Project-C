import errorLogger from "../../usefulFunctions/errorLogger";
import UpbitApiMarketCode from "../../../models/UpbitApiMarketCode";
import convertOriginalMarketCodeData from "./convertOriginalMarketCodeData";

const updateMarketCodeDatabase = async (
  formattedMarketCodeArray,
  originDataArray,
  changedMarketCodeList
) => {
  try {
    const addMarketCodeDataArray = await convertOriginalMarketCodeData(
      formattedMarketCodeArray,
      changedMarketCodeList.newMarketCodeList
    );
    const removeMarketCodeDataArray = await convertOriginalMarketCodeData(
      originDataArray,
      changedMarketCodeList.removedMarketCodeList
    );

    if (addMarketCodeDataArray) {
      try {
        addMarketCodeDataArray.forEach(async (marketCode) => {
          await UpbitApiMarketCode.create(marketCode);
          console.log("Saved: ", marketCode.englishName);
        });
      } catch (error) {
        errorLogger(
          error,
          "removeMarketCodeDataArray - if(addMarketCodeDataArray)"
        );
      }
    }

    if (removeMarketCodeDataArray) {
      try {
        removeMarketCodeDataArray.forEach(async (marketCode) => {
          console.log("deleting: ", marketCode.englishName);
          await UpbitApiMarketCode.deleteOne({
            marketCodeFull: marketCode.marketCodeFull,
          });
        });
      } catch (error) {
        errorLogger(
          error,
          "removeMarketCodeDataArray - removeMarketCodeDataArray"
        );
      }
    }
  } catch (error) {
    errorLogger(error, "removeMarketCodeDataArray");
  }
};

export default updateMarketCodeDatabase;
