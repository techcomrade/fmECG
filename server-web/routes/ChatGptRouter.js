const express = require("express");
const ChatGptController = require('../controllers/ChatGptController');
const router = express.Router();

router.get('/history',ChatGptController.getHistory);
router.post('',ChatGptController.sendMessage);

module.exports = router 