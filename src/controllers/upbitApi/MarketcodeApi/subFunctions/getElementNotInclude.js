import errorLogger from "../../../usefulFunctions/errorLogger";

const getElementNotInclude = async (list1, list2) => {
  try {
    const resultList = await list2.filter(
      (element) => !list1.includes(element)
    );
    return resultList;
  } catch (error) {
    errorLogger(error, "getElementNotInclude");
  }
};

export default getElementNotInclude;
