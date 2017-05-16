var mongoose = require('mongoose'),
    color = require('chalk');

module.exports = function (config){
    //********* Connection **********/       
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error',console.error.bind(console,color.red('connection error.....')));
    db.once('open', function callback(){
        console.log(color.green('DB local connected!'));
    });

    return db;
};
