var LocalStrategy   = require('passport-local').Strategy,
	bCrypt = require('bcrypt-nodejs'),
	mongoose = require('mongoose');

// User DB Entity
var Users = mongoose.model('User');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		console.log('serializing user:',user._id);
		//return the unique id for the user
		return done(null, user._id);
	});

	//Desieralize user will call with the unique id provided by serializeuser
	passport.deserializeUser(function(id, done) {

		Users.id(id, function(){
			// DB error
			if(err){
				return done(err, false);
			};
			// 
			if(!user){

			};
			return done(null, users[username]);
		});
	});

	passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) { 
			
				console.log(createHash(password));
			/*Users.findOne({username : username},function(err, data){
				// Db Error
				if(err){
					return done (err, false);
					console.log('DB fault user login ' + err);
				};

				// User not found
				if(!data){
					console.log('User Not Found with username user login ' + username);
					return done(null, false);
				};
				
				// User password check
				if(isValidPassword(data[username], password)){
					//sucessfully authenticated
					return done(null, data);
				}
				else{
					console.log('Invalid password user login ' + username);
					return done(null, false)
				};
			});*/
		}
	));

	passport.use('signup', new LocalStrategy({
			passReqToCallback : true // allows us to pass back the entire request to the callback
		},
		function(req, username, password, done) {

			users.findOne({username : username, function (err ,data) {
				// DB Error
				if (err){
					return done (err, false);
					console.log('DB fault user signup ' + err);
				};
				
				// User found already in use
				if (data){
					console.log('User already exists with username: ' + username);
					return done(null, false);
				}else {
					// if there is no user, create the user
					var newUser = new User();

					// set the user's local credentials
					newUser.username = username;
					newUser.password = createHash(password);

					// save the user
					newUser.save(function(err) {
						if (err){
							console.log('Error in Saving user signup: '+err);  
							throw err;  
						}
						console.log(newUser.username + ' Registration succesful');    
						return done(null, newUser);
					});
				};
			}});
	}));
		
	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};
