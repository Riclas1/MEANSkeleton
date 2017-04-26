var app = angular.module('pcuApp', ['ngRoute', 'ngResource']).run(function() {
	/*$rootScope.authenticated = false;
	$rootScope.current_user = 'Guest';

	$rootScope.signout = function(){
		$http.get('auth/signout');
		$rootScope.authenticated = false;
		$rootScope.current_user = 'Guest';
	};*/
});

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: '/partialview/main/main.html',
			    //templateUrl: '/partial/login.html',
			controller: 'mainController'
					
		})
		.when('/main', {
			templateUrl: '/partialview/main/main.html',
			controller: 'mainController'
		})	
		//the login display
		.when('/login', {
			templateUrl: '/partialview/login/login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/setup', {
			templateUrl: '/partialview/setup/setup.html',
			controller: 'authController'
		});
});

/*app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});*/




