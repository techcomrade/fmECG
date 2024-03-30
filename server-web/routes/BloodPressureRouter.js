const express = require("express");
const BloodPressureController = require("../controllers/BloodPressureController");
const BloodPressureMiddleware = require("../middlewares/BloodPressureMiddleware");
const router = express.Router();

router.get("/", BloodPressureController.getAllData);
router.get("/delete/:id", BloodPressureController.delete);

router.post(
  "/create-record",
  BloodPressureMiddleware.validateData,
  BloodPressureController.add
);
router.post(
  "/update/:id",
  BloodPressureMiddleware.validateData,
  BloodPressureController.update
);

module.exports = router;
