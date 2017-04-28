angular.module('pcuApp').controller('authController',['$scope', '$log', '$http', '$location' , function($scope, $log, $http, $location, $rootScope){
	$scope.$log = $log;
	$scope.error_message = '';
	
	$scope.user = {username: '', password: ''};

	$scope.loginbutton = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/main');
			}
			else{
				$log.error(data.message);
				$location.path = './parialview/main/main.html';
			}
		});
	};

}]);