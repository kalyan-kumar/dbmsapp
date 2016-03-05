var app = angular.module('dbmsapp', []);
app.controller ('mainController',['$scope', '$http','$window', '$log','$location', function($scope, $http, $window,$log,$location){
	var type="";
	$scope.init = function() {
		var url=$location.absUrl().substring($location.absUrl().lastIndexOf('=')+1,$location.absUrl().lastIndexOf('?'));
		type=$location.absUrl().substr($location.absUrl().lastIndexOf('~')+1);
		console.log(type);
		var query={'email':url};
		$http.post('/profile', query).success(function(response){
			console.log(response);
			$scope.get=response;
		});

	}
	$scope.gotohome = function() {
        console.log(type);

        var url="/"+type+"dash.html"+"?email="+$scope.get.mail;
        $window.location.href = url;
    }
	$scope.gotocourse = function() {
		console.log("maybe");
		var url="/courses.html"+"?email="+$scope.get.mail+"?type~"+type;
        $window.location.href = url;
	};
	$scope.check=function(){
		if(type=="teacher")
			return false;
		return true;
	}	
}]);	