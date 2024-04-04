const express = require('express');
const HeartRecController = require("../controllers/HeartRecController");
const HeartRecMiddleware = require("../middlewares/HeartRecMiddleware");

const router = express.Router();

router.get("/", HeartRecController.getAllData);
router.get(":email", HeartRecController.getHeartRecByEmail);
router.delete("/:id", HeartRecController.delebyId)


module.exports = router;
