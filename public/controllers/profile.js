var app = angular.module('dbmsapp', []);
app.controller ('mainController',['$scope', '$http','$window', '$log','$location', function($scope, $http, $window,$log,$location){
	var type="";

	var encode = function(textString){
		var words = CryptoJS.enc.Utf8.parse(textString); // WordArray object
		var base64 = CryptoJS.enc.Base64.stringify(words); // string: 'SGVsbG8gd29ybGQ='
		console.log(base64);
		return base64;
	}

	var decode = function(base64){
		var words = CryptoJS.enc.Base64.parse(base64);
		var textString = CryptoJS.enc.Utf8.stringify(words); // 'Hello world'
		console.log(textString);
		return textString;
	}
	$scope.init = function() {
		var sub = $location.absUrl().substr($location.absUrl().lastIndexOf('?')+1);
		var textString = decode(sub);
		var url=textString.substring(textString.lastIndexOf('=')+1,textString.lastIndexOf('?'));
		type=textString.substr(textString.lastIndexOf('~')+1);
		console.log(type);
		var query={'email':url};
		$http.post('/profile', query).success(function(response){
			console.log(response);
			$scope.get=response;
		});

	}
	$scope.gotohome = function() {
        console.log(type);
        var base64 = encode("email="+$scope.get.mail)
        var url="/"+type+"dash.html?"+base64;
        $window.location.href = url;
    }
	$scope.gotocourse = function() {
		console.log("maybe");
		var base64 = encode("email="+$scope.get.mail+"?type~"+type);
		var url="/courses.html?"+ base64;
        $window.location.href = url;
	};
	$scope.check=function(){
		if(type=="teacher")
			return false;
		return true;
	}	
}]);	