var mongoose = require('mongoose');
var Schema = mongoose.Shema;

mongoose.model('User', require('../entitys/auth/user'));
