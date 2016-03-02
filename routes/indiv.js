exports.regCour = function(req, res, next){
	console.log("Registering for course");
	modules.Course.find({'name':req.body.cname}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			res.send("No account exists with this email");
		} else if(docs.length > 1) {
			console.log("You fucked up again. Seriously Kalyan? -_-");
		} else {
			modules.Student
				.find({'mail':req.body.mail})
				.exec(function(err, studs){
				if (err) return handleError(err);
				if (studs.length == 0) {
					res.send("No account exists with this email");
				} else if(studs.length > 1) {
					console.log("You fucked up again. Seriously Kalyan? -_-");	
				} else {
					studs[0].courses.push(docs[0]);
				}
			});
		}	
	});
};

exports.viewCour = function(req, res, next){
	console.log("Showing all courses");
	modules.Course.find({}, function(err, docs){
		if (err) return handleError(err);
		res.json(docs);
	})
};

exports.makeCour = function(req, res, next){
	console.log("Create a course");
	modules.Course.find({}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length != 0) {
			res.send("A course already exists with this name");
		} else {
			var instance = new modules.Course();
			instance.name = req.body.name;
			instance.start = req.body.start;
			instance.end = req.body.end;
			instance.prof = req.body.prof;
			instance.content = req.body.content;
			instance.syllabus = req.body.syllabus;
			instance.prereq = req.body.prereq;
			instance.assignment = req.body.assignment;
			instance.enrollist = req.body.enrollist;
			instance.save(function(err){
				if (err) return handleError(err);
				res.send("Successfully created the course");
			});
		}
	});
};