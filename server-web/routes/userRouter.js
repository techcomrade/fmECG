const express = require('express')
const AccountController = require('../controllers/accountController');
const router = express.Router();

router.get('/register', AccountController.register)
router.post('/newAccount', AccountController.newAccount)

module.exports = router;