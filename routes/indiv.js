exports.regCour = function(req, res, next){
	console.log("Registering for course");
	console.log(req.body);
	modules.Course.find({'name':req.body.cname}, function(err, docs){
		if (err) return handleError(err);
		if (docs.length == 0) {
			res.send("No account exists with this email");
		} else if(docs.length > 1) {
			console.log("You fucked up again. Seriously Kalyan? -_-");
		} else {
			console.log(docs[0]);
			modules.Student.findOneAndUpdate({'mail':req.body.mail}, {$push:{"courses": docs[0]._id}}, function(err, model){
				if(err) return handleError(err);
				else console.log(model);
			});
			console.log("Yeah");
			modules.Student.find({'mail':req.body.mail}, function(err, them){
				if (err) return handleError(err);
				if (docs.length == 0) {
					res.send("No account exists with this email");
				} else if(docs.length > 1) {
					console.log("You fucked up again. Seriously Kalyan? -_-");
				} else {
					console.log(docs[0]);
					modules.Course.findOneAndUpdate({'name':req.body.cname}, {$push:{"enrollist": them[0]._id}}, function(err, model){
						if(err) return handleError(err);
						else console.log(model);
					});
					console.log("Yeah");
				}	
			});
			res.send("Success");
		}	
	});
};
// exports.getlist=function(req,res)
// {
// 	modules.Course.findOne({})
// }
exports.add_question = function(req, res, next) {
	try{
		var quiz = new quiz_collection({
			_id: req.body.quizID
		});
		quiz_collection.update({_id: quiz},{
			$push:{
				"questions" : {
					"question" : req.body.question,
					"optionArr" : req.body.optionArr,
					"answer" : req.body.answer
				}
			}
		},function(error,quiz){
			if(error){
				res.status(500).json({
					message: "failure",
					status_code: "500"
				});
			}
			else {
				res.status(200).json({
					message: "success",
					status_code:"200"
				});
			}
		});
	}
	catch(ex){
		console.log(ex);
		var obj = {}
		obj.message = "failure"
		obj.status_code = "500"
		res.json(JSON.stringify(obj));
	}
}
exports.viewCour = function(req, res, next){
	console.log("Showing all courses");
	modules.Course.find({}, function(err, docs){
		if (err) return handleError(err);
		res.json(docs);
	})
};
exports.getassessment = function(req, res, next){
	console.log("Showing all courses");
	modules.Course.find({'name':req.body.name}, function(err, docs){
		if (err) return handleError(err);
		else{
			index=req.index;
		res.json(docs.assessment[index]);
		}
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

exports.getlist = function(req, res, next) {
	var i, instance=[];
	for(i=0;i<req.body.enrollist.length;i++){
		modules.Student.find({'_id':req.body.enrollist[i]}, function(err, docs) {
			if (err) return handleError(err);
			if (docs.length == 0) {
				res.send("No account exists with this email");
			} else if(docs.length > 1) {
				console.log("You fucked up again. Seriously Kalyan? -_-");
			} else {
				var i, tmp = {};
				for(i=0;i<docs[0].submissions;i++){
					if(docs[0].submissions[i].cid==req.body.cname){
						tmp.name = docs[0].firstname;
						tmp.submit = docs[0].submissions[i].content;
						instance.push(tmp);
						break;
					}
				}
				res.json(instance);
			}
		});
	}
};