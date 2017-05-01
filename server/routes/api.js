var express = require('express');
var router = express.Router();

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	console.log(req.session);

	if (req.isAuthenticated()){
		console.log('auth gültig');
		return next();
	};

	// if the user is not authenticated then redirect him to the login page
	console.log('auth ungültig');
	return res.redirect('/');

	
};

//Register the authentication middleware
router.use('/posts', isAuthenticated);

//api for all posts
router.route('/posts')
	
	//create a new post
	.post(function(req, res){

		//TODO create a new post in the database
		res.send({message:"TODO create a new post in the database"});
	})

	.get(function(req, res){

		//TODO get all the posts in the database
		res.send({message:"TODO get all the posts in the database"});
	})

//api for a specfic post
router.route('/posts/:id')
	
	//create
	.put(function(req,res){
		return res.send({message:'TODO modify an existing post by using param ' + req.param.id});
	})

	.get(function(req,res){
		return res.send({message:'TODO get an existing post by using param ' + req.param.id});
	})

	.delete(function(req,res){
		return res.send({message:'TODO delete an existing post by using param ' + req.param.id})
	});

module.exports = router;