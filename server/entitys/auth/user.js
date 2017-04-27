var mongo = require('mongoose');

var usersc = mongo.Schema({
        firstname : String,
        lastname : String,
        password : String,
        level : String  
});

module.exports = mongo.model('user', usersc);

