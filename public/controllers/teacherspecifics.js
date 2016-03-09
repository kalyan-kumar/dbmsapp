var app = angular.module('dbmsapp', []);

app.controller ('mainController',['$scope', '$http','$window', '$log','$location', function($scope, $http, $window,$log,$location){
	// var deasync = require("deasync");

	var teacher = {};
	var assessment={};
	var course = {};
	var i=0;
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
		var sub = decode($location.absUrl().substr($location.absUrl().lastIndexOf('?')+1));
		var url=sub.substring(sub.lastIndexOf('=')+1,sub.lastIndexOf('?'));
		console.log(url);
		var courses=sub.substr(sub.lastIndexOf('~')+1);
		var query={'email':url, 'name':courses};
		console.log(query);
		$http.post('/getteachcour', query).success(function(response){
            console.log(response);
            $scope.teacher=response.teacher;
            $scope.course=response.course;
        });
	};
	var assessments=[]
	$scope.reset = function(quiz) {
    // $scope.user = angular.copy($scope.master);
    var ass={}
    ass = quiz;
    $scope.add(quiz);
    console.log("here");
    console.log(i);
  };
	$scope.add=function(assessment)
	{
		// console.log(assignment);
		// assessment.question=assignment;
		assessments.push(assessment);
		assessment={};
		// $scope.assessment={};
		console.log(assessments);
		$scope.assessment = {};
	};

	$scope.submitassessment=function(assessment)
	{
		console.log("here");
		$scope.reset(assessment);
		console.log(assessments);
		var query ={"assessments": assessments, "name": $scope.course.name};
		console.log(query);
		$http.post('/assessment',query).success(function(response){
			console.log(response);
		});
	};
	$scope.goHome = function() {
		var base64 = encode("email="+$scope.teacher.mail);
		var url="/teacherdash.html?"+base64;
		$window.location.href = url;
	};
	$scope.profile=function(){
		var base64 = encode("email="+$scope.teacher.mail+"?type~teacher");
		var url="/profile.html?"+base64;
        $window.location.href = url;
	}
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
		var query={"name": $scope.course.name, "fees":$scope.course.fees, "type":4};
		$http.post('/updcour', query).success(function(response){
            console.log(response);	
        });			
	};

}]);
