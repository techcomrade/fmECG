const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw());
app.use(express.static('public'));


app.listen(3000, () => {
    console.log('listening on port 3000');
})
const loginController = require('./controllers/loginController');
const authController = require('./controllers/authController')
app.get('/auth/login', loginController);
app.post('/user/login', authController);
