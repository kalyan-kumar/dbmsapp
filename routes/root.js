exports.approve = function(req, res, next) {
	modules.Instructor.find({'mail':req.body.mail}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			res.send("No account exists with this email");
		} else if(docs.length > 1) {
			console.log("You fucked up agian. Seriously Kalyan? -_-");
		} else {
			docs[0].status = true;
			res.send("Successfully Approved");
		}
	});
}

