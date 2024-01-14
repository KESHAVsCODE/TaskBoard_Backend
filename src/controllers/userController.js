const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginPost = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    const user = await User.findOne({ where: { userEmail } });
    if (!user) {
      // User not found
      return res
        .status(401)
        .json({ status: "failed", message: "User not found" });
    }

    const isPassword = await bcrypt.compare(userPassword, user.userPassword);

    if (isPassword) {
      const userData = {
        userId: user.userId,
        userName: user.userName,
      };
      const options = {
        expiresIn: "1d",
      };

      const jwtToken = jwt.sign(userData, process.env.JWT_SECRETE_KEY, options);

      res.cookie("AuthToken", jwtToken, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      });

      res.status(200).json({ status: "success", data: userData });
    } else {
      res.status(401).json({ status: "failed", message: "Invalid password" });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

const signupPost = async (req, res) => {
  const { userName, userPassword, userEmail } = req.body;

  const salt = bcrypt.genSaltSync(10);

  const hashPassword = bcrypt.hashSync(userPassword, salt);

  const newUser = {
    userName,
    userPassword: hashPassword,
    userEmail,
  };

  try {
    const data = await User.create(newUser);
    console.log(data);
    res
      .status(200)
      .json({ status: "success", message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", message: error.message });
  }
};

module.exports = { loginPost, signupPost };
