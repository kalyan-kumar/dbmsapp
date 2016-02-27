exports.register = function(req, res, next){
	console.log("Registering");
	modules.Student.find({'mail':req.body.mail}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length != 0) {
			res.send("An account with this mail already exists");
		} else {
			req.body.save(function(err){
				if (err) return handleError(err);
				res.send("Successfully created your account");
			});
		}
	});

};