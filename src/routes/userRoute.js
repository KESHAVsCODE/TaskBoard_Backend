const express = require("express");

const router = express.Router();

const { signupPost, loginPost } = require("../controllers/userController");

router.post("/login", loginPost);

router.post("/signup", signupPost);

module.exports = router;
