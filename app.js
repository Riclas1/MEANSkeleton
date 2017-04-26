var express = require('express'),
    passport = require('passport'),
    session = require('express-session'),
    http = require('http');

var app = express(),
    server = http.createServer(app),
    config = {  rootpath: __dirname,
                api : require('./server/routes/api.js'),
                authenticate : require('./server/routes/authenticate.js')(passport),
                index : require('./server/routes/index.js'),
                passport : passport
            },
    initPassport = require('./passport-init');


require('./server/config/express.js')(app, config)


/**********Passport Setup*********/
app.use(session({ secret: 'EssertGmbHKey',
                  resave: false,
                  saveUninitialized: true,
                  cookie: { secure: true,
                    maxAge: 3600000
                  }  
              }));
app.use(config.passport.initialize());
app.use(config.passport.session());

// Initialize Passport
initPassport(config.passport);


/********************************************************/
/***************Mongoose DB******************************/
/*mongdb.connect('mongodb://10.49.39.4:27017/local');
var db= mongdb.connection;
db.on('error',console.error.bind(console,'connection error.....'));
db.once('open', function (){
    console.log('DB local connected');
});
var testSchema = mongdb.Schema({string : String});
var testmodel = mongdb.model('test',testSchema);
var mongoTestMessage;
testmodel.findOne({},function(err,data){
    console.log(data);
});
*/
/*******************************************************/

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
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'));

console.log('Express server listening on port ' + server.address().port);
