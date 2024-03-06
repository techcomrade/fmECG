const express = require('express');

const loginRoute = require('./loginRoute');

let router = express.Router();

router.use('/user', loginRoute);
router.get('/test',(req,res)=>{
    res.send("ok")
})


module.exports = router;    