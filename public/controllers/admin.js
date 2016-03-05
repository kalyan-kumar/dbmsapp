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
	    // notif1 = {firstname : "Riya Bubna", email : "awd1@gmail.com"}
   		// notif2 = {firstname : "Riya is ugly", email : "awd2@gmail.com"}
   		// notif3 = {firstname : "Riya is fat", email : "awd3@gmail.com"}
   		// notiflist=[notif1,notif2,notif3];
   		// $scope.notiflist = notiflist;
	    // noNotifs = $scope.notiflist.length;
			
   		 // 
   		 

	}

	// refresh();
	$scope.init=function(){
		var url = $location.absUrl();
		
		var query = {'email':url.substr(url.lastIndexOf('=')+1)};
		console.log(query);
		$http.post('/admin', query).success(function(response){
            console.log(response);
            $scope.admin=response;
		});
		refresh();
	}
	$scope.profile=function(){
		var url="/profile.html"+"?email="+$scope.admin.mail+"?type~admin";
        $window.location.href = url;
	}
	$scope.goHome = function() {
        console.log("Going home yipppeee");
        var url="/admindash.html"+"?email="+$scope.admin.mail;
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