const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
require('dotenv').config({ path: '.env' })

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw());
app.use(express.static('public'));

// Router
app.use('/api', routes);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running at http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
})

