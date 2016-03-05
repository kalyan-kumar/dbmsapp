var app = angular.module('dbmsapp', []);
app.controller ('mainController',['$scope', '$http','$window', '$log','$location', function($scope, $http, $window,$log,$location){
	var studentemail = "";
	$scope.init = function() {
		var url=$location.absUrl().substring($location.absUrl().lastIndexOf('=')+1,$location.absUrl().lastIndexOf('?'));
		var courses=$location.absUrl().substr($location.absUrl().lastIndexOf('~')+1);
		var query={'email':url, 'course':courses};
		console.log(query);
		$http.post('/stin', query).success(function(response){
            console.log(response);
            $scope.student=response.student;
            studentemail = response.student.mail;
            $scope.course=response.course;           
		});
	}
	$scope.goHome = function() {
		var url="/studentdash.html"+"?email="+studentemail;
		$window.location.href = url;
	};
	$scope.viewCourses = function() {
		var url="/courses.html"+"?email="+$scope.student.mail;
        $window.location.href = url;
	};
}]);