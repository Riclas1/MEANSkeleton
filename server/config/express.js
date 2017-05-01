var express = require('express'),
    debug = require('debug')('Start'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    color = require('chalk');
       
module.exports = function(app, config,  passport){
     var routes = {  index : require('../routes/index.js'),
                    auth :  require('../routes/authenticate.js')(passport),
                    api:    require('../routes/api.js')
                }

    /**********View Engine Setup*********/
    app.set('views', config.rootpath + './server/views');
    app.set('view engine', 'ejs');

    app.use(favicon(config.rootpath + './public/favicon/node.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser('EssertGmbHKey'));
    app.use(express.static(config.rootpath + './public/views/index/'));
    
    /**********Session Setup*********/
    app.use(session({
                    secret: 'EssertGmbHKey',
                    resave: false,
                    saveUninitialized: false,
                    cookie: { 
                            maxAge: 1800000
                    }  
    }));

   /**********Passport Setup*********/
    app.use(passport.initialize());
    app.use(passport.session()); 
   
   
    /**********Routes Setup*********/
    app.use('/', routes.index);
    app.use('/auth', routes.auth);
    app.use('/api', routes.api);
    
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    };

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    app.set('port', config.port);

    console.log(color.green('express config done!'));
};