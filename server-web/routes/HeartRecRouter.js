const express = require('express');
const HeartRecController = require("../controllers/HeartRecController");
const HeartRecMiddleware = require("../middlewares/HeartRecMiddleware");

const router = express.Router();

router.get("/", HeartRecController.getAllData);
router.get("/:device_id", HeartRecController.getHeartRecByDeviceId);
router.delete("/:id", HeartRecController.getHeartRecByDeviceId)


module.exports = router;
