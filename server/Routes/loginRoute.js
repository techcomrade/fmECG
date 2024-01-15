const express = require('express');
const AuthenticationController = require('../Controllers/authController');
//require('../passport_login')

let router = express.Router();


router.get('/',AuthenticationController.view);
router.post('/auth', AuthenticationController.login);

router.get('/auth/google', AuthenticationController.googleLogin);
router.get('/auth/google/callback', AuthenticationController.callbackLoginGoogle);



module.exports = router;