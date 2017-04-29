var express = require('express'),
    passport = require('passport'),
    passportlocal = require('passport-local').Strategy,
    session = require('express-session'),
    http = require('http'),
    mongoos = require('mongoose'),
    color = require('chalk');

var app = express(),
    server = http.createServer(app),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config.js')[env];
 
/**********Express Setup*********/
require('./server/config/express.js')(app, config, passport);

/**********DB CMD Sart *********/
if(config.prod){   
    require('./server/cmd/mongodb.js')(config);
}

/**********Mongoos Setup*********/
setTimeout(function(){ require('./server/config/mongoose.connection')(config) },5000);

/**********Entity Setup*********/
setTimeout(function(){require('./server/config/mongoose.entity'),5500});

/**********Passport Setup*********/
setTimeout(function(){require('./server/config/passport-init.js')(passport),6000});
   
/**********Start Server*********/
server = require('http-shutdown')(server);

server.listen(app.get('port'));

console.log(color.green('Express server listening on port ' + server.address().port));


/**********cleanup after server shutdown*********/
server.on('shutdown',function() {
    /**********CMD Threadkill *********/
    if (config.prod) {
        require('./server/cmd/threadkill.js');
    };
});