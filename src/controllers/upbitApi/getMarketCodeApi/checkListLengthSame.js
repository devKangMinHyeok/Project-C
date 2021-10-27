import errorLogger from "../../usefulFunctions/errorLogger";

const checkListLengthSame = (list1, list2) => {
  try {
    if (list1.length !== list2.length) {
      return false;
    }
    return true;
  } catch (error) {
    errorLogger(error, "checkListLengthSame");
  }
};

export default checkListLengthSame;
