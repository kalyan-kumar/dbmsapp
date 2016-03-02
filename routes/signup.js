exports.register = function(req, res, next){
	modules.Student.find({'mail':req.body.mail}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length != 0) {
			res.send("failed");
		} else {
			var instance = new modules.Student();
			instance.firstname = req.body.firstname;
			instance.lastname = req.body.lastname;
			instance.mail = req.body.mail;
			instance.dob = req.body.dob;
			instance.password = req.body.password;
			instance.courses = [];
			instance.save(function(err){
				if (err) return handleError(err);
				res.send("student");
			});
		}
	});

};