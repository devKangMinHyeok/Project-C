import getTimeNow from "../usefulFunctions/getTimeNow";
import PORT from "./generatePortNum";

const handleListening = () => {
  console.log(
    `[${getTimeNow()}] Server listening on port ${
      process.env.SERVER_LOCATION
    }:${PORT}`
  );
};

export default handleListening;
