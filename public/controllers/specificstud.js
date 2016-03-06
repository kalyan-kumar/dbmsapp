var app = angular.module('dbmsapp', []);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
     restrict: 'A',
     link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function(){
       scope.$apply(function(){
        modelSetter(scope, element[0].files[0]);
    });
   });
  }
};
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
    	var fd = new FormData();
    	fd.append('file', file);
        $http
        .post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            console.log("success");
        })
        .error(function(){});
	}
}]);

app.controller ('mainController',['$scope', '$http','$window', '$log','$location','fileUpload', function($scope, $http, $window,$log,$location,fileUpload){
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
		var url="/courses.html"+"?email="+$scope.student.mail+"?type~student";
        $window.location.href = url;
    };
    $scope.uploadFile = function(){
    	var file = $scope.myFile;
    	console.log('file is ' );
    	console.dir(file);
    	var uploadUrl = "/files";
    	fileUpload.uploadFileToUrl(file, uploadUrl);
	};
}]);