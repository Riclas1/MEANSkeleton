var mongoose = require('mongoose');

module.exports = function (config){
    //********* Connection **********/       
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error',console.error.bind(console,'connection error.....'));
    db.once('open', function callback(){
        console.log('DB local connected!');
    });

    return db;
};
