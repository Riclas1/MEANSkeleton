var express = require('express'),
    passport = require('passport'),
    passportlocal = require('passport-local').Strategy,
    session = require('express-session'),
    http = require('http');

var app = express(),
    server = http.createServer(app),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config.js')[env],
    initPassport = require('./passport-init'),
    routes = {
        api : require('./server/routes/api.js'),
        authenticate : require('./server/routes/authenticate.js')(passport),
        index : require('./server/routes/index.js')
    }

/**********Express Setup*********/
require('./server/config/express.js')(app, config ,routes);

/**********Mongoos Setup*********/
require('./server/config/mongoos.js')(config);



// Initialize Passport
initPassport(passport);





server.listen(app.get('port'));

console.log('Express server listening on port ' + server.address().port);
