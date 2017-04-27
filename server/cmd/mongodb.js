var Promise = require('bluebird'),
    cmd = require('node-cmd');

module.exports = function(config){

const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })

var id = getAsync('sudo mongod --dbpath ' + config.rootpath + 'db').then(data => {
    console.log(data);
    }).catch(err => {
        if (!err.code === 100){
           console.log('cmd err', err);
        }
    });
};