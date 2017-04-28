angular.module('pcuApp').controller('mainController',['$scope', '$log', '$http', function($scope, $log, $http){
	$scope.$log = $log;
	$scope.value = "";
	$scope.Pos= "";
	$scope.Drehzahl = "";
	$scope.ajaxPost = function(slot,value){
		$scope.value = "senden";
		var req = {
 				method: 'POST',
 				url: '/api/Umrichter/' + slot,
 				headers: {
   					'Content-Type': undefined
	 			},
 				data: value  
		}
		$http(req).then(function(){$scope.value = "gesendet";}, function(){$scope.value = "fehler";});
	};
	
	$scope.$on('$viewContentLoaded', function(event) {
		$scope.value = "1";
	});

	
}]);