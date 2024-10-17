const express = require("express");
const ChatGptController = require('../controllers/ChatGptController');
const router = express.Router();

router.get('/history',ChatGptController.getHistory);
router.post('',ChatGptController.sendMessage);
router.post('/conversation',ChatGptController.createAIConversation);
router.post('/training',ChatGptController.training)
module.exports = router 