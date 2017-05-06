var Promise = require('bluebird'),
    cmd = require('node-cmd'),
    color = require('chalk');

module.exports = function(config){

const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })

var id = getAsync('sudo mongod --dbpath ' + config.rootpath + 'db').then(data => {
     }).catch(err => {
        if (!err.code === 100){
           console.log('cmd err', err);
        }
    });

    console.log(color.green('cmd db setup!'));
};