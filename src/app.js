const express = require("express");
const app = express();
const db = require("./config/database");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const listRouter = require("./routes/listRoute");
const taskRouter = require("./routes/taskRoute");
const { verifyUser } = require("./middlewares/auth");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // or specific app url
    credentials: true,
  })
);
app.use(cookieParser());

db.authenticate()
  .then(() => {
    console.log("Connection established");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use("/user", userRouter);
app.use("/list", verifyUser, listRouter);
app.use("/task", verifyUser, taskRouter);

app.get("/", (req, res) => {
  res.send("this is my app");
});

module.exports = app;
