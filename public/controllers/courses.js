var app = angular.module('dbmsapp', []);

app.controller('CourseList', ['$scope', '$http', '$window', '$log', '$location', function($scope, $http, $window, $log, $location) {
    console.log("Entered courselist fn");
    var courselist = [];
    var studente = "";
    var currcourse = "";
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
        var url = $location.absUrl();
        console.log("HERE");
        var sub = url.substr(url.lastIndexOf('?')+1);
        var textString = decode(sub);
        var query = {'email':textString.substring(textString.lastIndexOf('=')+1, textString.lastIndexOf('?'))};
        type=textString.substr(textString.lastIndexOf('~')+1);

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
        var base64=encode("email="+$scope.student.mail);
        var url="/"+type+"dash.html?"+base64;
        $window.location.href = url;
    }
    $scope.profile=function(){
    var base64 = encode("email="+$scope.student.mail+"?type~"+type);
    var url="/profile.html?"+base64;
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
            var base64 = encode("email="+$scope.student.mail+"?course~"+currcourse);
            var url="/specificstu.html?"+base64;
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
    $scope.checkenroll=function(id){
        var i;
        for(i=0;i<$scope.student.courses.length;i++)
        {
            if($scope.student.courses[i] == id)
                return true;
        }
        return false;
    }
}]);
