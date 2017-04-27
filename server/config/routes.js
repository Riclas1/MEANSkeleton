module.exports = function (app, config){
     /**********Path Setup*********/
    app.use('/', require(config.rootpath + '/server/routes/index.js'));
    app.use('/auth', require(config.rootpath + '/server/routes/authenticate.js'));
    app.use('/api', require(config.rootpath + '/server/routes/api.js'));
};