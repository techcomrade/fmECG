const express = require('express');
const authController = require('../controllers/AuthenController');

let router = express.Router();

router.get('/test',(req,res)=>{
    res.send("ok")
})

module.exports = router;