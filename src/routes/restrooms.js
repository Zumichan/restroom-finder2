const express = require("express");
const router = express.Router();

const restroomController = require("../controllers/restroomController")

router.get("/restrooms", restroomController.index);

module.exports = router;
