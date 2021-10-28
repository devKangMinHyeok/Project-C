// has same contents, not also array data order is differ
import errorLogger from "../../../usefulFunctions/errorLogger";
import checkListLengthSame from "./subFunctions/checkListLengthSame";
import listInclude from "./subFunctions/listInclude";

const hasSameContents = (list1, list2) => {
  let result = true;
  try {
    if (!checkListLengthSame(list1, list2)) {
      result = false;
    }

    if (result) {
      result = listInclude(list2, list1);
      result = listInclude(list1, list2);
    }

    return result;
  } catch (error) {
    errorLogger(error, "hasSameContents");
  }
};

export default hasSameContents;
