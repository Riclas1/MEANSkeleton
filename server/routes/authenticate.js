var express = require('express'),
	router = express.Router();
	

module.exports = function(passport){


	//sends successful login state back to angular
	router.get('/success', function(req, res){
		req.session.save(() => {
			res.send({state: 'success', user: req.user ? req.user : null});
    	})
	});

	//sends failure login state back to angular
	router.get('/failure', function(req, res){
		res.send({state: 'failure', user: null, message: "Invalid username or password"});
	});

	router.get('/logout',function(req, res){
		res.send({state: 'failure', user: null, message: "User logout"});
	});
	

	//log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure',
		session: true
	}));

	//sign up
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure',
		session: true
	}));

	//log out
	router.post('/logout', passport.authenticate('logout', {
		successRedirect: '/auth/logout',
		failureRedirect: '/auth/logout',
		session: false
	}));
		
	return router;

}