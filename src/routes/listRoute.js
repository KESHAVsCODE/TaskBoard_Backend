const express = require("express");
const router = express.Router();

const { createList, getListData } = require("../controllers/listController");

router.get("/", getListData);
router.post("/create", createList);
module.exports = router;
