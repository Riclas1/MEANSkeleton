var express = require('express'),
    passport = require('passport'),
    passportlocal = require('passport-local').Strategy,
    session = require('express-session'),
    http = require('http'),
    async = require('async');

var app = express(),
    server = http.createServer(app),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config.js')[env],
    initPassport = require('./passport-init');


    /**********Express Setup*********/
    require('./server/config/express.js')(app, config);

    /**********DB CMD Sart *********/
    require('./server/cmd/mongodb.js')(config);

    /**********Mongoos Setup*********/
    setTimeout(function(){ require('./server/config//mongoos.js')(config) },5000);

    /**********Routes Setup*********/
    require('./server/config/express.js')(app, config);


    // Initialize Passport
    initPassport(passport);

    server = require('http-shutdown')(server);

    server.listen(app.get('port'));

    console.log('Express server listening on port ' + server.address().port);


/**********cleanup after server shutdown*********/
server.on('shutdown',function() {
    /**********CMD Threadkill *********/
    require('./server/cmd/threadkill.js');
});