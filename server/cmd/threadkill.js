var Promise = require('bluebird'),
    cmd = require('node-cmd'),
    color = require('chalk');

module.exports = function(){

const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });

var id = getAsync('pkill mongod').then(data => {
    console.log(data);
    }).catch(err => {
         console.log('cmd err', err);
       
    });

    console.log(color.green('cmd db stopp!'));
};