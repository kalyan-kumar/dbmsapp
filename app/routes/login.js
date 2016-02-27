exports.enter = function(req, res, next) {
	
	console.log("Logging In");
	modules.Student.findOne({'mail':req.body.mail}, function(err, person){
		if(person.password)
	});
};