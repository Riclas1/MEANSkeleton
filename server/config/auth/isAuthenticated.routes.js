module.exports = function (req, res, next) {
	
    // if user is authenticated in the session, call the next() to call the next request handler 
		
	if (req.isAuthenticated()){
		console.log('auth gültig');
		return next();
	};

	// if the user is not authenticated then redirect him to the login page
	console.log('auth ungültig');
	return res.status(401).location('/').end();

	
};