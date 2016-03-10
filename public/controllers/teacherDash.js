var app = angular.module('dbmsapp', []);

app.controller ('mainController',['$scope', '$http','$window', '$log','$location', function($scope, $http, $window,$log,$location){
	
	var teacher={};
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
		var url=textString.substr(textString.lastIndexOf('=')+1);
		var query={'email':url};
		console.log(textString.substr(textString.lastIndexOf('=')+1));
		$http.post('/tein', query).success(function(response){
            console.log(response);
            $scope.teacher=response;
		});
	}

	$scope.goforit=function(){
		var base64 = encode("email="+$scope.teacher.mail);
		var url="/courses.html?"+base64;
		$window.location.href=url;
	};
	$scope.profile=function(){
		var base64 = encode("email="+$scope.teacher.mail+"?type~teacher");
		var url="/profile.html?"+base64;
        $window.location.href = url;
	}

	$scope.addcourse=function(){
		console.log("nooo");
		var base64 = encode("email="+$scope.teacher.mail+"?cname~"+$scope.coursename);
		var url="/teacherspecific.html?"+ base64;


		var query = {'ID':$scope.teacher._id, 'name':$scope.coursename};
		$http.post('/dummyadd', query).success(function(response){
            console.log(response);
            if(response.localeCompare("failed")!=0)
        		$window.location.href=url;     	
		});
	};
	
	$scope.goHome = function() {
		var base64 = encode("email="+$scope.teacher.mail);
		var url="/teacherdash.html?"+base64;
		$window.location.href = url;
	};

	$scope.linkit=function(name){
		var base64 = encode("email="+$scope.teacher.mail+"?course~"+name);
		url="/teacherspecific.html?"+ base64;
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
