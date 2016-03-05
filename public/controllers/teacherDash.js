var app = angular.module('dbmsapp', []);

app.controller ('mainController',['$scope', '$http','$window', '$log','$location', function($scope, $http, $window,$log,$location){
	
	var teacher={};
	$scope.init = function() {
		var url=$location.absUrl().substr($location.absUrl().lastIndexOf('=')+1);
		var query={'email':url};
		console.log($location.absUrl().substr($location.absUrl().lastIndexOf('=')+1));
		$http.post('/tein', query).success(function(response){
            console.log(response);
            $scope.teacher=response;
		});
	}

	$scope.goforit=function(){
		var url="/courses.html?email="+$scope.teacher.mail;
		$window.location.href=url;
	};
	$scope.profile=function(){
		var url="/profile.html"+"?email="+$scope.teacher.mail+"?type~teacher";
        $window.location.href = url;
	}

	$scope.addcourse=function(){
		console.log("nooo");
		var url="/teacherspecific.html?email="+$scope.teacher.mail+"?cname~"+$scope.coursename;
		var query = {'devil':$scope.teacher.firstname+" "+$scope.teacher.lastname, 'email':$scope.teacher.mail, 'name':$scope.coursename};
		$http.post('/dummyadd', query).success(function(response){
            console.log(response);
            if(response.localeCompare("failed")!=0)
        		$window.location.href=url;     	
		});
	};
	
	$scope.goHome = function() {
		var url="/teacherdash.html"+"?email="+$scope.teacher.mail;
		$window.location.href = url;
	};

	$scope.linkit=function(name){
		url="/teacherspecific.html?email="+$scope.teacher.mail+"?course~"+name;
		$window.location.href=url;
	};

	$scope.courses=[{
		"name":"lol",
		"professor":"notlol"
	},
	{
		"name":"lnol",
		"professor":"botlol"
	}];
	$scope.calendars=[{
		"date":"Today",
		"info":"DBMS",
		"task":"assigment"
	},
	{
		"date":"12-11-2015",
		"info":"networks",
		"task":"assigment"
	}];
	
}]);
