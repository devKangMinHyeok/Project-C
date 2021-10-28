const gerneratePostNum = (localPort) => {
  const PORT = process.env.PORT || localPort;
  return PORT;
};

const PORT = gerneratePostNum(process.env.LOCAL_PORT);
export default PORT;
