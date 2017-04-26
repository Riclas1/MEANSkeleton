var express = require('express'),
    debug = require('debug')('Start'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session');
   
module.exports = function(app, config){
    
    /**********View Engine Setup*********/
    app.set('views', config.rootpath + '/server/views');
    app.set('view engine', 'ejs');

    app.use(favicon(config.rootpath + '/public/favicon/node.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(config.rootpath + '/public/views/'));

    /**********Path Setup*********/
    app.use('/', config.index);
    app.use('/auth', config.authenticate);
    app.use('/api', config.api);

    /**********Passport Setup*********/
    /*app.use(session({
                    secret: 'EssertGmbHKey',
                    resave: false,
                    saveUninitialized: true,
                    cookie: { secure: true,
                            maxAge: 3600000
                    }  
                }));
    app.use(config.passport.initialize());
    app.use(config.passport.session());*/

};