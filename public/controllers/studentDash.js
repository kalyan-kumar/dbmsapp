var app = angular.module('dbmsapp', []);

app.controller('testController', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location){
	var url = $location.absUrl();
	var student = {};
	$scope.courseNames = [{_id:Number, name:String, prog:String}];
	var calendar = [{
		type: String,
		name: String,
		ofcour: String,
		attime: Date,
		status: Boolean
	}];
	$scope.init = function() {
		var url = $location.absUrl();
		var query = {'email':url.substr(url.lastIndexOf('=')+1)};
		console.log(query);
		$http.post('/sstin', query).success(function(response){
            $scope.student = response;
            console.log($scope.student);
            var i, j, x, y, instance, d = new Date();
	    	for(i=0;i<$scope.student.courses.length;i++){
	    		var query = {ID:$scope.student.courses[i]};
	    		$http.post('/courname', query).success(function(response){
	    			$scope.courseNames.push({_id:$scope.student.courses[i], name:response.name, prof:response.prof});
	    		});
	    		console.log($scope.courseNames);
	    	}
	       	var now = d.getTime();
	       	x = $scope.student.courses.length;
	        /*for(i=0;i<x;i++) {
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
	        });*/
        });
	};
	$scope.viewCourses = function() {
		var url="/courses.html"+"?email="+$scope.student.mail+"?type~student";
        $window.location.href = url;
	};

	$scope.goHome = function() {
		var url="/studentdash.html"+"?email="+$scope.student.mail;
		$window.location.href = url;
	};
	$scope.profile=function(){
		var url="/profile.html"+"?email="+$scope.student.mail+"?type~student";
        $window.location.href = url;
	}
	$scope.linkit=function(name){
        url="/specificstu.html?email="+$scope.student.mail+"?course~"+name;
        $window.location.href=url;
    };
    $scope.getCourDet = function(){
    	var i;
    	for(i=0;i<$scope.student.courses.length;i++){
    		var query = {ID:$scope.student.courses[i]};
    		$http.post('/courname', query).success(function(response){
    			$scope.courseNames.push({_id:$scope.student.courses[i], name:response.name, prof:response.prof});
    		});
    	}
    }
}]);