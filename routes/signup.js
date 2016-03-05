exports.register = function(req, res, next){
	if(req.body.isfaculty.localeCompare("Student")==0) {
		modules.Student.find({'mail':req.body.mail}, function(err, docs){
			if (err) return handleError(err);
			if (docs.length != 0) {
				res.send("failed");
			} else {
				var instance=new modules.Student();
				instance.firstname = req.body.firstname;
				instance.lastname = req.body.lastname;
				instance.mail = req.body.mail;
				instance.dob = req.body.dob;
				instance.password = req.body.password;
				instance.courses = [];
				instance.submissions = [];
				instance.save(function(err){
					if (err) return handleError(err);
					else res.send("success");
				});
			}
		});
	} else {
		modules.Instructor.find({'mail':req.body.mail}, function(err, docs){
			if (err) return handleError(err);
			if (docs.length != 0) {
				res.send("failed");
			} else {
				var instance = new modules.Instructor();
				instance.status = false;
				instance.firstname = req.body.firstname;
				instance.lastname = req.body.lastname;
				instance.mail = req.body.mail;
				instance.dob = req.body.dob;
				instance.password = req.body.password;
				instance.courses = [];
				instance.save(function(err){
					if (err) return handleError(err);
					else res.send("success");
				});
			}
		});
	}
};