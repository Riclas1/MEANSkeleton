var mongoos = require('mongoose');

module.exports = function (config){
    //********* Connection **********/       
    mongoos.connect(config.db);
    var db= mongoos.connection;
    db.on('error',console.error.bind(console,'connection error.....'));
    db.once('open', function callback(){
        console.log('DB local connected');
    });
};
