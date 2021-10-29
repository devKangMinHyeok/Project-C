import errorLogger from "./usefulFunctions/errorLogger";

const home = async (req, res) => {
  try {
    return res.render("home");
  } catch (error) {
    errorLogger(error, "home");
  }
};

export default home;
