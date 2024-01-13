const express = require("express");
const router = express.Router();
const {
  createTask,
  deleteTask,
  moveTask,
} = require("../controllers/taskController");

router.post("/create", createTask);
router.delete("/delete", deleteTask);
router.patch("/move", moveTask);

module.exports = router;
