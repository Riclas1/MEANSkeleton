var path = require('path');
var rootpath = path.normalize(__dirname + '/../../');

module.exports = {
    dev: {
        db: 'mongodb://localhost:27017/local',
        rootpath : rootpath,
        port: process.env.port || 3000,
        pord: false        
    },
    pro: {
        db: 'mongodb://localhost:27017/local',
        rootpath : rootpath,
        port: process.env.port || 80,
        prod: true
   }   
};