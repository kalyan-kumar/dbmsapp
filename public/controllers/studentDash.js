var app = angular.module('dbmsapp', []);

app.controller('testController', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location){
	var url = $location.absUrl();
	var student = {};
	var calendar = [{
		type: String,
		name: String,
		ofcour: String,
		attime: Date,
		status: Boolean
	}];
	var encode = function(textString){
		console.log(textString);
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
	var query = {'email':textString.substr(textString.lastIndexOf('=')+1)};
	console.log(query);
	$http.post('/sstin', query).success(function(response){
		$scope.student = response;
		console.log($scope.student);

		var i, j, x, y, instance, d = new Date();
		var now = d.getTime();
		x = $scope.student.courses.length;
		for(i=0;i<x;i++) {
			y = $scope.student.courses[i].lectures.length;
			for(j=0;j<y;j++){
				instance.type = "Lecture";
				instance.name = "Lecture " + $scope.student.courses[i].lectures[j].id;
				instance.ofcour = $scope.student.courses[i].name,
				instance.attime = $scope.student.courses[i].lectures[j].start;
				instance.status = now > $scope.student.courses[i].lectures[j].start;
				calendar.push(instance);
			}
		}
		x = $scope.student.submissions.length;
		for(i=0;i<x;i++){
			instance.type = "Submission";
			instance.name = $scope.student.submissions[i].asstitle;
			instance.ofcour = $scope.student.submissions[i].ofcour;
			instance.attime = $scope.student.submissions[i].maxtime;
			instance.status = now > $scope.student.submissions[i].subtime;
			calendar.push(instance);
		}
		calendar.sort(function(a, b){
			return new Date(a.attime) - new Date(b.attime);
		});
	});
};
$scope.viewCourses = function() {
	var base64 = encode("email="+$scope.student.mail+"?type~student");
	var url="/courses.html?"+base64;
	$window.location.href = url;
};

$scope.goHome = function() {
	var base64 = encode("email="+$scope.student.mail);
	var url="/studentdash.html?"+base64;
	$window.location.href = url;
};
$scope.profile=function(){
	var base64 = encode("email="+$scope.student.mail+"?type~student");
	var url="/profile.html?"+base64;
	$window.location.href = url;
}
$scope.linkit=function(name){
	var base64 = encode("email="+$scope.student.mail+"?course~"+name);
	url="/specificstu.html?"+base64;
	$window.location.href=url;
};
}]);