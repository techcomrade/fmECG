const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const routes = require('./routes/index');
const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || 'localhost';

require('dotenv').config({ path: '.env' })

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw());
app.use(express.static('public'));
app.use(cors());
app.use(compression());
// Router
app.use('/api', routes);

const loginController = require("./controllers/LoginController");
app.get('/login', loginController);

app.listen(port, () => {
    console.log(`Server is running at http://${host}:${port}`);
})

