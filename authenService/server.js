const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const compression = require('compression')
const path = require('path');
const routes = require('./routes/register');
const passport = require('passport');
const routesLogin = require('./routes/login')

// var routes = require('./api/route/index');
const app = express();
const port = process.env.PORT || 3000 ;
const host = process.env.HOST || 'localhost';

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', key: 'sid'}));  //Save user loginc
// set up domain
app.set('port', port);
app.set('host', host);
// setup network security
app.use(cors());
app.options('*', cors());
// setup compression for increased performance
app.use(compression());
// limit date to post in json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw());
//set up static files

app.use(express.static('./build'));

// app.use(limitConcurrentSessions)
// app.use('/api',routes);

app.use('/', routes);
app.use('/api', routesLogin);
  
app.use(passport.initialize());
app.use(passport.session());

app.listen(app.get('port'), app.get('host'),()=>{
    console.log(`hello Server is running at http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
    })