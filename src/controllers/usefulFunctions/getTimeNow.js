const getTimeNow = () => {
  const time = new Date();
  const hour = time.getHours().toString().padStart(2, "0");
  const minute = time.getMinutes().toString().padStart(2, "0");
  const second = time.getSeconds().toString().padStart(2, "0");

  return `${hour}:${minute}:${second}`;
};

export default getTimeNow;
