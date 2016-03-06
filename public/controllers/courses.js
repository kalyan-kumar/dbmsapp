var app = angular.module('dbmsapp', []);

app.controller('CourseList', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log("Entered courselist fn");
    var courselist = [];
    var studente = "";
    var currcourse = "";
    var type="";
    $scope.init = function() {
        var url = $location.absUrl();
        var query = {'email':url.substring(url.lastIndexOf('=')+1, url.lastIndexOf('?'))};
        type=$location.absUrl().substr($location.absUrl().lastIndexOf('~')+1);

        console.log(query);
        $http.post('/sstin', query).success(function(response){
            console.log(response);
            $scope.student = response;
            studente = response.mail;
        });

        $http.post('/viewcour').success(function(response) {
            $scope.courselist=response;
        });
    }

   $scope.goHome = function() {
        console.log(type);

        var url="/"+type+"dash.html"+"?email="+$scope.student.mail;
        $window.location.href = url;
    }

    $scope.SelectCourse = function(name) {
        currcourse = name;
        console.log(currcourse);
    }
    $scope.istype=function(){
        if(type=="admin")
            return true;
        return false;
    }
    $scope.PayandAddCourse=function() {
        console.log(currcourse);
        var query = {'cname':currcourse, 'mail':studente};
        $http.post('/regcour', query).success(function(response){
            console.log(response);
            var url="/specificstu.html?email="+$scope.student.mail+"?course~"+currcourse;
            $window.location.href=url;
        });
    }

    $scope.enrolled=function() {
        var i;
        for(i=0;i<courselist.length;i++){
            if (courselist[i].name.localeCompare($scope.course.name)) {
                if(courselist[i].indexOf($scope.student.mail)>-1)
                    return true;
            }
            return false;
        }
    }
}]);
