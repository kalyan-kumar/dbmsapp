var app = angular.module('dbmsapp', []);

app.controller ('mainController',['$scope', '$http','$window', '$log','$location', function($scope, $http, $window,$log,$location){
	$scope.init = function() {
		var url=$location.absUrl().substr($location.absUrl().lastIndexOf('=')+1,$location.absUrl().lastIndexOf('?'));
		console.log(url);
		var courses=$location.absUrl().substr($location.absUrl().lastIndexOf('~')+1);
		var query={'email':url, 'name':courses};
		console.log($location.absUrl().substr($location.absUrl().lastIndexOf('=')+1));
		$http.post('/initteacherspec', query).success(function(response){
            console.log(response);
            $scope.teacher=response[0];
            $scope.course=response[1];
        });
	};

	$scope.updatecontent=function(){
		console.log($scope.course.content);
		var query={"name": $scope.course.name, "content":$scope.course.content};
		$http.post('/updatecontent', query).success(function(response){
            console.log(response);	
        });			
	};

	$scope.updatesyllabus=function(){
		console.log($scope.course.syllabus);
		var query={"syllabus":$scope.course.syllabus, "name":$scope.course.name};
		$http.post('/updatesyllabus', query).success(function(response){
            console.log(response);	
        });			
	};

	$scope.updateprereq=function(){
		console.log($scope.course.prereq);
		var query={"name": $scope.course.name, "prereq":$scope.course.prereq};
		$http.post('/updateprereq', query).success(function(response){
            console.log(response);	
        });			
	};

	$scope.updatefees=function(){
		console.log($scope.course.prereq);
		var query={"name": $scope.course.name, "prereq":$scope.course.prereq};
		$http.post('/updatefees', query).success(function(response){
            console.log(response);	
        });			
	};

}]);
