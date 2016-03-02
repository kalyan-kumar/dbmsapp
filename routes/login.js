exports.checkauth = function(req, res, next) {
	console.log("Logging In");
	modules.Student.find({'mail':req.body.mail}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			
		} else if(docs.length > 1) {
			console.log("You fucked up while registering users. Seriously Kalyan? -_-");
		} else {
			if(docs[0].password.localeCompare(req.body.password)==0) {
				console.log("Passwords matched");
				res.send("student");
			}
		}
	});
};

exports.loadSData = function(req, res, next) {
	console.log("Getting the student data");
	modules.Student.find({'mail':req.body.email}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			res.send("No account exists with this email");
		} else if(docs.length > 1) {
			console.log("You fucked up while registering users. Seriously Kalyan? -_-");
		} else {
			res.json(docs[0]);
		}
	});
};

exports.loadTData = function(req, res, next) {
	console.log("hehhhe");
	modules.Instructor.find({'mail':req.body.email}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			res.send("No account exists with this email");
		} else if(docs.length > 1) {
			console.log("You fucked up while registering users. Seriously Kalyan? -_-");
		} else {
			res.json(docs[0]);
		}
	});
};