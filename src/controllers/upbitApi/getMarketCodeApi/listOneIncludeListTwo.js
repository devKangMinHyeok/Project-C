import errorLogger from "../../usefulFunctions/errorLogger";

const listOneIncludeListTwo = (list1, list2) => {
  let result = true;
  try {
    for (let i = 0; i < list2.length; i++) {
      if (!list1.includes(list2[i])) {
        result = false;
        break;
      }
    }
    return result;
  } catch (error) {
    errorLogger(error, "listOneIncludeListTwo");
  }
};
export default listOneIncludeListTwo;
