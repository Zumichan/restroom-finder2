const express = require("express");
const router = express.Router();

const restroomController = require("../controllers/restroomController")

router.get("/restrooms", restroomController.index);
router.get("/restrooms/new", restroomController.new);
router.post("/restrooms/create", restroomController.create);

module.exports = router;
