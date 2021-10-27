const errorLogger = (error, errorName) => {
  console.log(`⛔ERROR in ${errorName}⛔ | ` + error);
  throw new Error(error);
};

export default errorLogger;
