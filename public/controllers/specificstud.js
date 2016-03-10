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
  var encode = function(textString){
    var words = CryptoJS.enc.Utf8.parse(textString); // WordArray object
    var base64 = CryptoJS.enc.Base64.stringify(words); // string: 'SGVsbG8gd29ybGQ='
    console.log(base64);
    return base64;
  }
  var score = 0;
  var i=0;
  var decode = function(base64){
    var words = CryptoJS.enc.Base64.parse(base64);
    var textString = CryptoJS.enc.Utf8.stringify(words); // 'Hello world'
    console.log(textString);
    return textString;
  }
  $scope.dloadfile = function(id){
    console.log(id);
        assigntxt=$scope.course.assignments[id].statement;
      }
  $scope.TestAngularMethod = function(text){
    var query={'student':$scope.student, 'id':$scope.course._id,'ass_name':text};
    $http.post('/sendass', query).success(function(response){
            console.log(response);

        });
  }
	$scope.init = function() {
   // $scope.assigntxt="wwww";
    var sub = $location.absUrl().substr($location.absUrl().lastIndexOf('?')+1);
    var textString = decode(sub);
		var url=textString.substring(textString.lastIndexOf('=')+1,textString.lastIndexOf('?'));
		var courses=textString.substr(textString.lastIndexOf('~')+1);
		var query={'email':url, 'course':courses};
		console.log(query);
		$http.post('/stin', query).success(function(response){
            console.log(response);
            $scope.student=response.student;
            studentemail = response.student.mail;
            $scope.course=response.course;
            $scope.assignm = $scope.course.assignments; 
          
        });
	}
  var assesslist=[];
  $scope.openthis=function($index)
  {
    console.log($scope.course.assessments[$index].questions[i]);
    assesslist=$scope.course.assessments[$index].questions;
    $scope.question=$scope.course.assessments[$index].questions[i];
  }
	$scope.goHome = function() {
    var base64=encode("?email="+studentemail);
		var url="/studentdash.html?"+base64;
		$window.location.href = url;
	};
  $scope.profile=function(){
    var base64 = encode("email="+$scope.student.mail+"?type~student");
    var url="/profile.html?"+base64;
        $window.location.href = url;
  }
	$scope.viewCourses = function() {
    var base64 = encode("?email="+$scope.student.mail+"?type~student");
		var url="/courses.html?"+base64;
        $window.location.href = url;
    };
 $scope.mailfac = function(){
  var data={};
  // var data = {
  //   from: req.body.name + '<' + req.body.sendermail + '>',
  //   to: req.body.email,
  //   subject: req.body.subject,
  //   text: req.body.text
  // };
  data.text = $scope.mail.cont;
  data.subject = $scope.mail.sub;
  data.email = $scope.course.prof.mail;
  data.name = $scope.student.firstname;
  data.sendermail = $scope.student.mail;
  $http.post('/contactform', data).success(function(response){
    console.log("Mail sent");
  });
 };
   $scope.nextform = function() {
    console.log($scope.optionRadios);
    if ($scope.optionRadios+1==assesslist[i].key){
      score=score+1;
    }
    i=i+1;
    if(assesslist.length>i){
      $scope.question=assesslist[i];
      // $scope.start();
    }
    else{
      alert("Your final score is : " + score);
     // $scope.closeSelf();
     $('#myModal').modal('hide');
     i=0;
     score=0;
    } 
  };
}]);