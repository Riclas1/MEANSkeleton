var mongo = require('mongoose');

module.exports = function (config){
    //********* Connection **********       
    mongo.connect(config.db);
    var db= mongo.connection;
    db.on('error',console.error.bind(console,'connection error.....'));
    db.once('open', function callback(){
        console.log('DB local connected');
    });



    var userSchema = mongo.Schema({
        firstname : String,
        lastname : String,
        password : String,
        level : String  
    });

    var user = mongo.model('user', userSchema);


};
