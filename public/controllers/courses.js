var app = angular.module('dbmsapp', []);

app.controller('CourseList', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log("Entered courselist fn");
    var courselist = [];
    var student = {};
    var currcourse = "";

    $scope.init = function() {
        var url = $location.absUrl();
        var query = {'email':url.substr(url.lastIndexOf('=')+1)};
        console.log(url);
        $http.post('/stin', query).success(function(response){
            console.log(response);
            $scope.student = response;
        });

        $http.post('/viewcour').success(function(response) {
            $scope.courselist=response;
        });
    }

    $scope.goHome = function() {
        console.log("Going home yipppeee");
        var url="/studentdash.html"+"?email="+$scope.student.mail;
        $window.location.href = url;
    }

    $scope.SelectCourse = function(name) {
        console.log(name);
        currcourse = name;
    }

    $scope.PayandAddCourse=function(name) {
        console.log(currcourse);
        var query = {'cname':currcourse, 'mail':student.mail};
        $http.post('/regcour', query).success(function(response){
            console.log(response);
        });
    }

    course1 = {
    	name : 'coa',
    	syl: 'shit1',
    	prereq: 'apal',
    	fees: '1000',
    	instr: 'apal1',
    	contact:'1'
    };
    course2 = {
    	name : 'coa2',
    	syl: 'shit2',
    	prereq: 'apal',
    	fees: '1000',
    	instr: 'apal2',
    	contact:'2'
    };
    course3 = {
    	name : 'coa3',
    	syl: 'shit3',
    	prereq: 'apal',
    	fees: '1000',
    	instr: 'apal3',
    	contact:'3'
    };
}]);
