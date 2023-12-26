const express = require('express');
const StoreUserController = require('../Controllers/StoreUserController');


let router = express.Router();

router.get('/', StoreUserController.view);
router.post('/user', StoreUserController.store);

router.get('/auth/register/google', StoreUserController.registerGoogle);
router.get('/auth/register/google/callback', StoreUserController.callbackGoogleRegister);


module.exports = router;