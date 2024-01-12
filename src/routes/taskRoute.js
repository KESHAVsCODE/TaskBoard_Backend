const express = require("express");
const router = express.Router();
const { createTask } = require("../controllers/taskController");

router.post("/create", createTask);
router.delete("/delete", createTask);

module.exports = router;
