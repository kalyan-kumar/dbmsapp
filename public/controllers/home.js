var app = angular.module('dbmsapp', []);

app.controller('MainController', ['$scope', '$http', '$log', function($scope, $http, $log) {
    var vm = this;
    $scope.title=('Pani Pani Pani');
}]);


app.controller('loginController', ['$scope', '$http', '$log', '$window', '$location', function($scope, $http, $log, $window, $location) {
    $scope.user = {};

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
    $scope.checkauth=function(){
        var url="dash.html?email="+$scope.user.mail;
        console.log(url);
        $http.post('/login', $scope.user).success(function(response){
            console.log(response);
            console.log($scope.user.mail);
            if(response.localeCompare("failed")!=0) {
                if(response!="notapproved")
                {
                    // var  tmp = CryptoJS.AES.encrypt($scope.user.mail, '111');
                    //  console.log(tmp.toString());
                var base64 = encode("email="+$scope.user.mail);
                $window.location.href="/" + response + "dash.html?"+base64;
            }
                else
                    alert("You have not been approved yet");
            }
        });
        // $scope.user = {};
    }
}]);

app.controller('signController', ['$scope', '$http', '$log', '$window', '$location', function($scope, $http, $log, $window, $location) {
    $scope.user = {};
    
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

    $scope.addStudent=function(){
        var url="dash.html"+"?email="+$scope.user.mail;
        if($scope.user.isfaculty.localeCompare("Student")==0)
        	var flag = true;
        else
        	var flag = false;
        console.log($scope.user);
        $http.post('/signup', $scope.user).success(function(response){
            console.log(response);
            if(response.localeCompare("failed")==0)
                console.log("An account exists with this email");
            else {
            	console.log($scope.user);
                if(flag)
                    {
                        var base64=encode("email="+$scope.user.mail);
                        $window.location.href = "/studentdash.html?" + base64;
                    }
                else
                    alert("Notification has been sent to the admin");
            }
        });
        // $scope.user = {};
    }
}]);

app.controller("parentController",['$scope', '$http', '$log', '$window', '$location', function($scope, $http, $log, $window, $location){
    this.user={};
    console
    this.checkauth=function(user){
        console.log("here");
        var query = {"email":$scope.parent.email, "dob": $scope.parent.dob};
        $http.post('/parentcheck', query).success(function(response){
            console.log(response);
            if(response=="success")
                $window.location.href = "/parentdash.html?email="+$scope.parent.email;
        });
    }
}]);