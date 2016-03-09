var app = angular.module('dbmsapp', []);

app.controller('AdminCt', ['$scope', '$http', '$log','$window','$location' ,function($scope, $http, $log,$window,$location) {
    console.log("Entered admin fn");

    var noNotifs={}

	var refresh = function(){
		$http.get('/admins').success(function(response) {
	    	$scope.notiflist=response;
	    	$scope.noofnotifs=$scope.notiflist.length;
	    	console.log(response);
	    	console.log("here");
	    });
	}

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

	// refresh();
	$scope.init=function(){
		var url = $location.absUrl();
		console.log("HERE");
		var sub = url.substr(url.lastIndexOf('?')+1);
		var textString = decode(sub);
		var query = {'email':textString.substr(textString.lastIndexOf('=')+1)};
		// var query = {'email':url.substr(url.lastIndexOf('=')+1)};
		$http.post('/admin', query).success(function(response){
            console.log(response);
            $scope.admin=response;
		});
		refresh();
	}
	$scope.profile=function(){
		var base64=encode("?email="+$scope.admin.mail+"?type~admin");
		var url="/profile.html?"+base64;
		console.log(url);
        $window.location.href = url;
	}
	$scope.goHome = function() {
        console.log("Going home yipppeee");
        var base64=encode("?email="+$scope.admin.mail);
        var url="/admindash.html?"+base64;
        $window.location.href = url;
    }
	$scope.accept=function(email) {
		//console.log("accepted");
		console.log(email);
		var query = {'email':email};
		$http.post('/adaccept',query).success(function(response){
			console.log(response);
		});
		refresh();
	}

	$scope.reject=function(email) {
		// console.log("rejected");
		var query = {'email':email};
		$http.post('/adreject',query).success(function(response){
			console.log(response);
		});
		refresh();
	}


    $scope.DeleteFac=function() {
		console.log($scope.remove_fac);
		$http.post('/admin/' + $scope.remove_fac).success(function(response){
			console.log(response);
		});
	}

	$scope.RemCourse=function() {
		console.log($scope.rem_course);
		$http.post('/admin/' + $scope.rem_course).success(function(response){
			console.log(response);
		});
	}

}]);