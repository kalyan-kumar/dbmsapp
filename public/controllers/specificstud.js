var app = angular.module('dbmsapp', []);
app.controller ('mainController',['$scope', '$http','$window', '$log','$location', function($scope, $http, $window,$log,$location){
	$scope.init = function() {
		var url=$location.absUrl().substr($location.absUrl().lastIndexOf('=')+1,$location.absUrl().lastIndexOf('?'));
		var courses=$location.absUrl().substr($location.absUrl().lastIndexOf('~')+1);
		var query={'email':url, 'course':courses};
		console.log($location.absUrl().substr($location.absUrl().lastIndexOf('=')+1));
		 $http.post('/tein', query).success(function(response){
             console.log(response);
             $scope.student=response[0];
             $scope.course=response[1];
             
	});