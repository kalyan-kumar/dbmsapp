var app = angular.module('dbmsapp', []);

app.controller('MainController', ['$scope', '$http', '$log', function($scope, $http, $log) {
    var vm = this;
    $scope.title=('Pani Pani Pani');
}]);


app.controller('loginController', ['$scope', '$http', '$log', '$window', '$location', function($scope, $http, $log, $window, $location) {
    $scope.user = {};
    $scope.checkauth=function(){
        var url="dash.html"+"?email="+$scope.user.mail;
        $http.post('/login', $scope.user).success(function(response){
            console.log(response);
            $window.location.href="/" + response + url;
        });
        $scope.user = {};
    }
}]);

app.controller('signController', ['$scope', '$http', '$log', '$window', '$location', function($scope, $http, $log, $window, $location) {
    $scope.user = {};
    $scope.addStudent=function(){
        var url="dash.html"+"?email="+$scope.user.mail;
        console.log($scope.user);
        $http.post('/signup', $scope.user).success(function(response){
            console.log(response);
            if(response.localeCompare("failed")==0) {
                console.log("An account exists with this email");
            } else {
                $window.location.href = "/" + response + url;
            }
        });
        $scope.user = {};
    }
}]);

app.controller("parentController",['$http',function($http){
    this.user={};
    this.checkauth=function(user){

    }
}]);