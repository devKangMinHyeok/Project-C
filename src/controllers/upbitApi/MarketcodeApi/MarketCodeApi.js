// DB Model
import UpbitApiMarketCode from "../../../models/UpbitApiMarketCode";

// MarketCodeApi Class
import errorLogger from "../../usefulFunctions/errorLogger";

//For getApi
import fetch from "node-fetch";

//For format
import parseMarketCodeObj from "./subFunctions/parseMarketCodeObj";

//For getUpdates
import getMarketCodeFull from "./subFunctions/getMarketCodeFull";
import hasSameContents from "./subFunctions/hasSameContents";
import getElementNotInclude from "./subFunctions/getElementNotInclude";

//for updateDatabase
import convertToOriginalData from "./subFunctions/convertToOriginalData";

class MarketCodeApi {
  constructor(url, options) {
    this.url = url;
    this.options = options;
  }

  init = async () => {
    try {
      this.marketCodeArray = await this.getApi();
      this.originCodeArray = await UpbitApiMarketCode.find({});
      this.formattedCodeArray = await this.format();
      this.updates = await this.getUpdates();

      if (this.updates) {
        console.log("updated!!");
        console.log(this.updates);
        await this.updateDatabase();
      } else {
        console.log("Not Updated!!");
      }
    } catch (error) {
      errorLogger(error, "MarketCodeApi<-init");
    }
  };

  getApi = async () => {
    try {
      const response = await fetch(this.url, this.options);
      return await response.json();
    } catch (error) {
      errorLogger(error, "MarketCodeApi<-getApi");
    }
  };

  format = () => {
    let formattedArray = [];
    try {
      this.marketCodeArray.forEach((data) => {
        const { market, korean_name, english_name, market_warning } = data;
        const formattedData = parseMarketCodeObj(
          market,
          korean_name,
          english_name,
          market_warning
        );
        formattedArray.push(formattedData);
      });
      return formattedArray;
    } catch (error) {
      errorLogger(error, "MarketCodeApi<-format");
    }
  };

  getUpdates = async () => {
    try {
      const currentCodeList = getMarketCodeFull(this.formattedCodeArray);
      const originCodeList = getMarketCodeFull(this.originCodeArray);

      const isSame = hasSameContents(currentCodeList, originCodeList);

      if (isSame) {
        return false;
      } else {
        const newCodeList = await getElementNotInclude(
          originCodeList,
          currentCodeList
        );
        const removedCodeList = await getElementNotInclude(
          currentCodeList,
          originCodeList
        );
        const changedMarketCodeObj = {
          newCodeList,
          removedCodeList,
        };
        return changedMarketCodeObj;
      }
    } catch (error) {
      errorLogger(error, "MarketCodeApi<-getUpdates");
    }
  };

  updateDatabase = async () => {
    try {
      const addArray = await convertToOriginalData(
        this.formattedCodeArray,
        this.updates.newCodeList
      );
      const removeArray = await convertToOriginalData(
        this.originCodeArray,
        this.updates.removedCodeList
      );

      if (addArray) {
        try {
          addArray.map(async (data) => {
            await UpbitApiMarketCode.create(data);
            return console.log("Saved: ", data.englishName);
          });
        } catch (error) {
          errorLogger(error, "MarketCodeApi<-updateDatabase<-if(removeArray)");
        }
      }

      if (removeArray) {
        try {
          removeArray.map(async (data) => {
            await UpbitApiMarketCode.deleteOne({
              marketCodeFull: data.marketCodeFull,
            });
            return console.log("deleted: ", data.englishName);
          });
        } catch (error) {
          errorLogger(error, "MarketCodeApi<-updateDatabase<-if(removeArray)");
        }
      }
    } catch (error) {
      errorLogger(error, "MarketCodeApi<-updateDatabase<-");
    }
  };
}

export default MarketCodeApi;

/* test dataset
this.marketCodeArray = [
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
