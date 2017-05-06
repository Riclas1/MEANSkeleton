angular.module('pcuApp').controller('authController',['$scope', '$log', '$http', '$location', '$rootScope' , function($scope, $log, $http, $location, $rootScope){
	$scope.$log = $log;
	$scope.error_message = '';
	$scope.user = {username: '', password: ''};
	$rootScope.authenticated = false;
	$rootScope.current_user = '';

	$scope.loginbutton = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.state == 'success'){
				$log.info('success login from server!'+ data.state);
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/main');
			}
			else{
				$log.error(data.message);
				$location.path('/');
			}
		});
	};

}]);