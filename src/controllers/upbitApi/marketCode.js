import fetch from "node-fetch";

// DB Model
import UpbitApiMarketCode from "../../models/UpbitApiMarketCode";

const parseMarketCodeObj = (
  market_code_full,
  korean_name,
  english_name,
  market_warning
) => {
  try {
    const marketCode = market_code_full.split("-");
    const market = marketCode[0];
    const marketCodeTiny = marketCode[1];
    const parsedDataObj = {
      market: market,
      marketCodeTiny: marketCodeTiny,
      marketCodeFull: market_code_full,
      koreanName: korean_name,
      englishName: english_name,
      marketWarning: market_warning,
    };
    return parsedDataObj;
  } catch (error) {
    console.log("[ERROR in parseMarketCodeObj] | ", error);
  }
};

const checkUpdates = async (newDataArray, originDataArray) => {
  let originDataMarketCodeList = [];
  let newDataMarketCodeList = [];

  originDataArray.forEach((originData) => {
    originDataMarketCodeList.push(originData.marketCodeFull);
  });
  newDataArray.forEach((newData) => {
    newDataMarketCodeList.push(newData.marketCodeFull);
  });

  const isSame =
    JSON.stringify(originDataMarketCodeList) ===
    JSON.stringify(newDataMarketCodeList);
  if (isSame) {
    return false;
  } else {
    const newMarketCodeList = newDataMarketCodeList.filter(
      (marketCode) => !originDataMarketCodeList.includes(marketCode)
    );
    const removedMarketCodeList = originDataMarketCodeList.filter(
      (marketCode) => !newDataMarketCodeList.includes(marketCode)
    );
    const changedMarketCodeList = {
      newMarketCodeList,
      removedMarketCodeList,
    };
    return changedMarketCodeList;
  }
};

const updateMarketCodeDatabase = async (
  formattedMarketCodeArray,
  originDataArray,
  changedMarketCodeList
) => {
  const addMarketCodeDataArray = await formattedMarketCodeArray.filter(
    (marketCode) => {
      return changedMarketCodeList.newMarketCodeList.includes(
        marketCode.marketCodeFull
      );
    }
  );

  const removeMarketCodeDataArray = await originDataArray.filter(
    (marketCode) => {
      return changedMarketCodeList.removedMarketCodeList.includes(
        marketCode.marketCodeFull
      );
    }
  );

  if (addMarketCodeDataArray) {
    try {
      addMarketCodeDataArray.forEach(async (marketCode) => {
        console.log("Saving: ", marketCode.englishName);
        await UpbitApiMarketCode.create(marketCode);
      });
    } catch (error) {
      console.log(
        "[ERROR in removeMarketCodeDataArray - addMarketCodeDataArray] | " +
          error
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
      console.log(
        "[ERROR in removeMarketCodeDataArray - removeMarketCodeDataArray] | " +
          error
      );
    }
  }
};

const getMarketCodeApi = async () => {
  const url = "https://api.upbit.com/v1/market/all?isDetails=true";
  const options = { method: "GET", headers: { Accept: "application/json" } };
  try {
    const response = await fetch(url, options);
    const marketCodeArray = await response.json();
    const originDataArray = await UpbitApiMarketCode.find({});

    let formattedMarketCodeArray = [];

    marketCodeArray.forEach(async (data) => {
      const { market, korean_name, english_name, market_warning } = data;
      const formattedData = parseMarketCodeObj(
        market,
        korean_name,
        english_name,
        market_warning
      );
      formattedMarketCodeArray.push(formattedData);
    });
    const isUpdated = await checkUpdates(
      formattedMarketCodeArray,
      originDataArray
    );

    if (isUpdated) {
      console.log("updated!!");
      await updateMarketCodeDatabase(
        formattedMarketCodeArray,
        originDataArray,
        isUpdated
      );
    }
  } catch (error) {
    console.log("[ERROR in getMarketCodeApi] | " + error);
  }
};

export default getMarketCodeApi;
