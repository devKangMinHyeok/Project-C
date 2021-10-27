// has same contents, not also array data order is differ
import errorLogger from "../../usefulFunctions/errorLogger";
import checkListLengthSame from "./checkListLengthSame";
import listOneIncludeListTwo from "./listOneIncludeListTwo";

const twoListHasSameContents = (list1, list2) => {
  let result = true;
  try {
    if (!checkListLengthSame(list1, list2)) {
      result = false;
    }

    if (result) {
      result = listOneIncludeListTwo(list2, list1);
      result = listOneIncludeListTwo(list1, list2);
    }

    return result;
  } catch (error) {
    errorLogger(error, "twoListHasSameContents");
  }
};

export default twoListHasSameContents;
