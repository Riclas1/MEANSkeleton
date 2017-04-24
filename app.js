var express = require('express'),
    debug = require('debug')('Start'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    http = require('http'),
    mongdb = require('mongoose');
    

var api = require('./routes/api'),
    authenticate = require('./routes/authenticate')(passport),
    index = require('./routes/index.js');

var app = express();

// Create a server
var server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(session({
  secret: 'EssertGmbHKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

/***************Path Setting******************************/

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

app.use('/home', index);
app.use('/auth', authenticate);
app.use('/api', api);

/**********************************************/
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
/**********************************************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);

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
