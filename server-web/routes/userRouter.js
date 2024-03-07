const express = require('express')
const accountController = require('../controllers/accountController');
const router = express.Router();

// router.get('/register', accountController.renderRegister)
router.post('/newAccount', accountController.newAccount)

module.exports = router;