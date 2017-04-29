var mongoose = require('mongoose');
var Schema = mongoose.Shema;

mongoose.model('User', require('../entitys/auth/user'));

console.log('entity init done!');

/*var user = mongoose.model('User');

user.find({}, function(err,data){
    if(err){
        console.log(err);
        return;
    };

    console.log(data);
})*/