const express = require('express');
const DeviceController = require("../controllers/DeviceController");
const UserController = require("../controllers/UserController");
const RecordController = require("../controllers/RecordController");

const router = express.Router();

router.get('/device', DeviceController.countDevice);

router.get('/user', UserController.countUser);

router.get('/record', RecordController.countRecord);

module.exports = router;