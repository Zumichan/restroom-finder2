const express = require("express");
const router = express.Router();

const restroomController = require("../controllers/restroomController")

router.get("/restrooms", restroomController.index);
router.get("/restrooms/new", restroomController.new);
router.post("/restrooms/create", restroomController.create);
router.get("/restrooms/:id", restroomController.show);
router.post("/restrooms/:id/destroy", restroomController.destroy);
router.get("/restrooms/:id/edit", restroomController.edit);
router.post("/restrooms/:id/update", restroomController.update);

module.exports = router;
