angular.module('pcuApp').controller('mainController',['$scope', '$log', '$http', '$location' ,'$rootScope', function($scope, $log, $http, $location ,$rootScope){
	$scope.$log = $log;
	$scope.value = "";
	$scope.Pos= "";
	$scope.Drehzahl = "";
	$scope.ajaxPost = function(slot,value){
		$log.warn('senden');
		var req = {
 				method: 'POST',
 				url: '/api/posts',
				 headers: {
   					'Content-Type': undefined
	 			},
 				data: value  
		}
		$http(req).then(function(data){
			$log.info('succes');
			
		}, function(data){
			$log.error('error');
			if(data.status){
				$location.path('/');
			};
		});
	};
	
	$scope.$on('$viewContentLoaded', function(event) {
		$scope.value = "1";
	});

	
}]);