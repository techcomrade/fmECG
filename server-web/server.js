const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config({ path: '.env' })
const routes = require('./routes/index');
const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || '127.0.0.1';


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw());
app.use(express.static('public'));
app.use(cors());
app.use(compression());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));

// Router
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running at http://${host}:${port}`);
})

