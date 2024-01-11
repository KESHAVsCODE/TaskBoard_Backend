const User = require("../models/User");

const loginPost = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const user = await User.findOne({ where: { userEmail } });
  if (!user) {
    // User not found
    return res
      .status(401)
      .json({ status: "failed", message: "User not found" });
  }

  if (userPassword === user.userPassword) {
    const userData = {
      userId: user.userId,
      userEmail,
    };

    res.status(200).json({ status: "success", message: userData });
  } else {
    res.status(401).json({ status: "failed", message: "Invalid password" });
  }
};

const signupPost = async (req, res) => {
  console.log("Input Data is ->", req.body);

  const { userName, userPassword, userEmail } = req.body;

  const newUser = {
    userName,
    userPassword,
    userEmail,
  };
  try {
    const data = await User.create(newUser);
    console.log(data);
    res
      .status(200)
      .json({ status: "success", message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", message: error.message });
  }
};

module.exports = { loginPost, signupPost };
