import fetch from "node-fetch";
import errorLogger from "../../usefulFunctions/errorLogger";

const sleep = (ms) => {
  try {
    console.log("sleeping...");
    return new Promise((resolve) => setTimeout(resolve, ms));
  } catch (error) {
    errorLogger(error, "marketCandleFetch<-sleep");
  }
};

const waitApiRemain = (response) => {
  try {
    const remainString = response.headers.get("remaining-req");

    let words = remainString.split(";");
    words = words.map((word) => word.trim());
    const min = words[1].split("=");
    const sec = words[2].split("=");
    const remainMin = Number(min[1]);
    const remainSec = Number(sec[1]);

    if (remainSec === 0) {
      console.log(`No remaining api request limit!!`);
      return 1000;
    }
    if (remainMin === 0) {
      console.log(`No remaining api request limit!!`);
      return 60000;
    }
    return 0;
  } catch (error) {
    errorLogger(error, "marketCandleFetch<-waitApiRemain");
  }
};

const marketCandleFetch = async (url, options) => {
  try {
    let response = await fetch(url, options);
    const sleepTime = waitApiRemain(response);

    if (sleepTime !== 0) {
      await sleep(sleepTime);
    }

    let result = await response.json();
    return result;
  } catch (error) {
    errorLogger(error, "marketCandleFetch");
  }
};

export default marketCandleFetch;
