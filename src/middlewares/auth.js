require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyUser = async (req, res, next) => {
  const { AuthToken } = req.cookies;
  console.log("verifyUser", AuthToken);
  if (!AuthToken) {
    return res.status(401).json({
      status: "failed",
      message: `Auth token is required`,
    });
  }
  try {
    const user = jwt.verify(AuthToken, process.env.JWT_SECRETE_KEY);
    req.body.userId = user.userId;
    next();
  } catch (err) {
    console.log("verifyUser", err.message);
    res.status(400).json({ status: "failure", message: err.message });
  }
};

module.exports = { verifyUser };
