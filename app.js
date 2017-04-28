var express = require('express'),
    passport = require('passport'),
    passportlocal = require('passport-local').Strategy,
    session = require('express-session'),
    http = require('http'),
    mongoos = require('mongoose');

var app = express(),
    server = http.createServer(app),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config.js')[env];
 
 var routes = { index : require('./server/routes/index.js'),
                api : require('./server/routes/api.js'),
                authenticate : require('./server/routes/authenticate.js')(passport)
            };



/**********Express Setup*********/
require('./server/config/express.js')(app, config, passport, routes);

/**********DB CMD Sart *********/
require('./server/cmd/mongodb.js')(config);

/**********Mongoos Setup*********/
setTimeout(function(){ require('./server/config/mongoose.connection')(config) },5000);

/**********Entity Setup*********/
require('./server/config/mongoose.entity');

/**********Passport Setup*********/
require('./server/config/passport-init.js')(passport);
   
/**********Start Server*********/
server = require('http-shutdown')(server);

server.listen(app.get('port'));

console.log('Express server listening on port ' + server.address().port);


/**********cleanup after server shutdown*********/
server.on('shutdown',function() {
    /**********CMD Threadkill *********/
    require('./server/cmd/threadkill.js');
});