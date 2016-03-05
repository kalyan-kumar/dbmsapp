var app = angular.module('dbmsapp', []);

app.controller ('mainController',['$scope', '$http','$window', '$log','$location', function($scope, $http, $window,$log,$location){
	
	var teacher = {};
	var course = {};
	$scope.init = function() {
		var url=$location.absUrl().substring($location.absUrl().lastIndexOf('=')+1,$location.absUrl().lastIndexOf('?'));
		console.log(url);
		var courses=$location.absUrl().substr($location.absUrl().lastIndexOf('~')+1);
		var query={'email':url, 'name':courses};
		console.log(query);
		$http.post('/getteachcour', query).success(function(response){
            console.log(response);
            $scope.teacher=response.teacher;
            $scope.course=response.course;
        });
	};

	$scope.goHome = function() {
		var url="/teacherdash.html"+"?email="+$scope.teacher.mail;
		$window.location.href = url;
	};

	$scope.updatecontent=function(){
		console.log($scope.course.content);
		var query={"name": $scope.course.name, "content":$scope.course.content, "type":1};
		$http.post('/updcour', query).success(function(response){
            console.log(response);
        });			
	};

	$scope.updatesyllabus=function(){
		console.log($scope.course.syllabus);
		var query={"syllabus":$scope.course.syllabus, "name":$scope.course.name, "type":2};
		$http.post('/updcour', query).success(function(response){
            console.log(response);	
        });			
	};

	$scope.updateprereq=function(){
		console.log($scope.course.prereq);
		var query={"name": $scope.course.name, "prereq":$scope.course.prereq, "type":3};
		$http.post('/updcour', query).success(function(response){
            console.log(response);	
        });			
	};

	$scope.updatefees=function(){
		console.log($scope.course.fees);
		var query={"name": $scope.course.name, "prereq":$scope.course.fees, "type":4};
		$http.post('/updcour', query).success(function(response){
            console.log(response);	
        });			
	};

}]);
