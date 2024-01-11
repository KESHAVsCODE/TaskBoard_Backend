const express = require("express");
const app = express();
const db = require("./config/database");
const userRouter = require("./routes/userRoute");
const listRouter = require("./routes/listRoute");
const taskRouter = require("./routes/taskRoute");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

db.authenticate()
  .then(() => {
    console.log("Connection established");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use("/user", userRouter);
app.use("/list", listRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send("this is my app");
});

module.exports = app;
