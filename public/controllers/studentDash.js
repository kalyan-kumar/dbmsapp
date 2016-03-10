var app = angular.module('dbmsapp', []);

app.controller('testController', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location){
	var url = $location.absUrl();
	var student = {};
	$scope.courseNames = [];
	$scope.calendar = [];
	$scope.noticearray = [];
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
		var url = $location.absUrl().substr($location.absUrl().lastIndexOf('?')+1);
		var aftdec = decode(url);
		var query = {'email':aftdec.substr(aftdec.lastIndexOf('=')+1)};
		$http.post('/sstin', query).success(function(response){
            $scope.student = response;
            console.log($scope.student);
            var i, j, x, y, instance, d = new Date();
	    	for(i=0;i<$scope.student.courses.length;i++){
	    		var query1 = {ID:$scope.student.courses[i]};
	    		$http.post('/courname', query1).success(function(response){
	    			console.log(response);
	    			$scope.courseNames.push({_id:$scope.student.courses[i], name:response.name, prof:response.prof});
	    			console.log($scope.courseNames);

	    		});
	    		var query2 = {ID:$scope.student.courses[i]};
	    		$http.post('/courdate', query2).success(function(response){
	       			console.log(response);
	       			var j;
	       			for(j=0;j<response.length;j++)
	       				$scope.calendar.push({cname:response[j].cname, type:response[j].type, title:response[j].title, when:response[j].when});
	       		});
	       		var l=0;
	       		console.log($scope.student.courses.length);
	    		for(l=0;l<$scope.student.courses.length;l++){
	    			console.log("YO");
	    			var query3 = {ID:$scope.student.courses[i]};
		    		$http.post('/noticecourse', query3).success(function(response){
		    			console.log(response);
		    			$scope.noticearray.push({ quizlen:response.assessmentlength,name:response.name, asslen:response.assignmentlength});
		    		});
	    		}
	    	}
	       	var now = d.getTime();
	        $scope.calendar.sort(function(a, b){
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