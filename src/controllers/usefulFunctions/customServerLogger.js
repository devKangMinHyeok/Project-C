import morgan from "morgan";
import moment from "moment-timezone";

const customServerLogger = (timezone) => {
  morgan.token("date", (req, res, tz) => {
    return moment().tz(tz).format();
  });

  morgan.format(
    "myformat",
    `[:date[${timezone}]] ":method :url" :status :res[content-length] - :response-time ms`
  );

  const logger = morgan("myformat");
  return logger;
};

export default customServerLogger;
