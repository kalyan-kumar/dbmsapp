exports.makeChange = function(req, res, next) {
	console.log("Updating course");
	switch(req.body.type) {
		case 1:
			modules.Course.findOneAndUpdate({'name':req.body.name}, {'content': req.body.content}, function(err, docs){
				if (err) return handleError(err);
				if (docs.length == 0) {
					res.send("No course exists with this name");
				} else if(docs.length > 1) {
					console.log("You fucked up again. Seriously Kalyan? -_-");
				} else {
					res.send(req.body.content);
				}
			});
			break;
		case 2:
			modules.Course.findOneAndUpdate({'name':req.body.name}, {'content': req.body.content}, function(err, docs){
				if (err) return handleError(err);
				if (docs.length == 0) {
					res.send("No course exists with this name");
				} else if(docs.length > 1) {
					console.log("You fucked up again. Seriously Kalyan? -_-");
				} else {
					res.send(req.body.content);
				}
			});
			break;
		case 3:
			modules.Course.findOneAndUpdate({'name':req.body.name}, {'content': req.body.content}, function(err, docs){
				if (err) return handleError(err);
				if (docs.length == 0) {
					res.send("No course exists with this name");
				} else if(docs.length > 1) {
					console.log("You fucked up again. Seriously Kalyan? -_-");
				} else {
					res.send(req.body.content);
				}
			});
			break;
		case 4:
			modules.Course.findOneAndUpdate({'name':req.body.name}, {'content': req.body.content}, function(err, docs){
				if (err) return handleError(err);
				if (docs.length == 0) {
					res.send("No course exists with this name");
				} else if(docs.length > 1) {
					console.log("You fucked up again. Seriously Kalyan? -_-");
				} else {
					res.send(req.body.content);
				}
			});
			break;
	}
};

exports.addCour = function (req, res, next) {
	console.log("Creating a course");
	modules.Course.find({'name':req.body.name}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			var instance = new modules.Course();
			instance.name = req.body.name;
			instance.prof = req.body.devil;
			instance.save(function(err){
				if (err) return handleError(err);
				modules.Instructor.findOneAndUpdate({'_id':req.body.devil}, {$push:{"courses":instance._id}}, function(err, model){
					console.log(instance._id);
					console.log("Updated");
					console.log(model);
				});
			});
			res.send("Now add the details -_-");
		} else {
			res.send("failed");
		}
	});
};

exports.addassessment = function (req, res, next)
{
	console.log("Adding Assessment");
	modules.Course.find({'name':req.body.name}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			res.send("no such course found")
			}
			
		 else {
			var instance=new modules.Assessment();
			instance.questions=req.body.assessment;
			console.log(instance.questions);

			// instance.index=docs.assessments.length;
			modules.Course.findOneAndUpdate({'name':req.body.name}, {$push:{"assessments": instance}, function(err, model){
				if(err){
					console.log("why god why?");
					return handleError(err);
				} 
				else {console.log("adding it ");
				}
			}
		});
		}
	});
};



exports.tagCour = function (req, res, next) {
	console.log("Tagging Course");
	var instr = {};
	var cour = {};
	modules.Instructor.find({'mail':req.body.email}, function(err, docs){
		if (err) return handleError(err);
		if(docs.length == 0) {
			res.send("failed");
			console.log("No such professor");
		} else if (docs.length > 1){
			res.send("failed");
			console.log("You fucked up again. Seriously Kalyan? -_-");
		} else {
			instr = docs[0];
			console.log(instr);
			modules.Course.find({'name':req.body.name}, function(err, docs){
				if (err) return handleError(err);
				if(docs.length == 0) {
					res.send("failed");
					console.log("No such course");
				} else if (docs.length > 1){
					res.send("failed");
					console.log("You fucked up again. Seriously Kalyan? -_-");
				} else {		
					cour = docs[0];
					console.log(cour);
					var instance = {'teacher':instr, 'course': cour};
					res.json(instance);
				}
			});
		}
	});
}
